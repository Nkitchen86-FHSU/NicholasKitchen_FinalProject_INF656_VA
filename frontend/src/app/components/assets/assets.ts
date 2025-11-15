import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AssetService, Asset } from '../../services/asset';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';
import { FormsModule } from '@angular/forms';
import { AdminService, User } from '../../services/admin';

@Component({
  selector: 'app-assets',
  imports: [CommonModule, Navbar, FormsModule],
  templateUrl: './assets.html',
  styleUrl: './assets.css',
})
export class Assets implements OnInit {
  assets: Asset[] = [];
  users: User[] = [];
  editingId: string | null=null;
  newAsset = { name: '', category: '', serialNumber: '', assignedUser: '', purchaseDate: '', warranty: '', status: 'Active'};

  sortOption: string =  '';
  filter = {
    categories: new Set<string>(),
    users: new Set<string>(),
    status: new Set<string>(),
  }
  originalAssets: Asset[] = [];

  constructor(
    private assetService: AssetService, 
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  // Load assets and users on initilization.
  ngOnInit() {
    this.loadAssets();
    this.loadUsers();
  }

  // Load all assets from MongoDB
  loadAssets() {
    this.assetService.getAssets().subscribe({
      next: (res) => {
        this.assets = res as any[];
        this.originalAssets = [ ...this.assets ];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load assets', err)
    });
  }

  // Load all users from MongoDB
  loadUsers() {
    this.adminService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res as any[];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load assets', err)
    });
  }

  // Following 3 functions are used to create or update an asset.
  // Open the modal and populate the information with the selected asset.
  openEditModal(asset: Asset) {
    this.editingId = asset._id;
    this.newAsset = {...asset };
  }

  // Update or create the asset depending if it has an editingId.
  saveAsset() {
    if (this.editingId) {
      this.assetService.updateAsset(this.editingId, this.newAsset).subscribe(() => {
        this.finishSave();
      });
    } else {
      this.assetService.createAsset(this.newAsset).subscribe(() => {
        this.finishSave();
      });
    }
  }

  // Reset the newAsset and editingId field. Reload assets.
  finishSave() {
    this.newAsset = { name: '', category: '', serialNumber: '', assignedUser: '', purchaseDate: '', warranty: '', status: 'Active'};
    this.editingId = null;
    this.loadAssets();
  }
  
  // Delete the selected asset.
  deleteAsset(id: string) {
    if (!confirm('Delete this asset?')) return;
    this.assetService.deleteAsset(id).subscribe(() => this.loadAssets());
  }

  // Sort the asset list by purchaseDate or name.
  sortAssets() {
    if (!this.sortOption) return;

    this.assets.sort((a,b) => {
      switch(this.sortOption) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);

        case 'date-asc': return (a.purchaseDate || '').localeCompare(b.purchaseDate || '');
        case 'date-desc': return (b.purchaseDate || '').localeCompare(a.purchaseDate || '');
      }
      return 0;
    });
  }

  // Toggle function for filter
  toggleFilter(set: Set<string>, value: string) {
    if (set.has(value)) set.delete(value);
    else set.add(value);

    this.filterAssets();
  }

  // Filter the asset list by category, assignedUser, or status.
  filterAssets() {
    this.assets = this.originalAssets.filter(asset => {
      const categoryMatch = this.filter.categories.size === 0 || this.filter.categories.has(asset.category);
      const assignedUserMatch = this.filter.users.size === 0 || this.filter.users.has(asset.assignedUser || '');
      const statusMatch = this.filter.status.size === 0 || this.filter.status.has(asset.status);

      return categoryMatch && assignedUserMatch && statusMatch;
    });

    this.sortAssets();
  }
}
