import { Component, OnInit } from '@angular/core';
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
  newAsset = { name: '', category: '', serialNumber: '', assignedUser: '', purchaseDate: '', warranty: '', status: 'Active'};

  constructor(
    private assetService: AssetService, 
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.loadAssets();
    this.loadUsers();
  }

  loadAssets() {
    this.assetService.getAssets().subscribe({
      next: (res) => this.assets = res as any[],
      error: (err) => console.error('Failed to load assets', err)
    });
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe({
      next: (res) => this.users = res as any[],
      error: (err) => console.error('Failed to load assets', err)
    });
  }

  createAsset() {
    this.assetService.createAsset(this.newAsset).subscribe(() => {
      this.newAsset = { name: '', category: '', serialNumber: '', assignedUser: '', purchaseDate: '', warranty: '', status: 'Active'};
      this.loadAssets();
    });
  }

  deleteAsset(id: string) {
    if (!confirm('Delete this asset?')) return;
    this.assetService.deleteAsset(id).subscribe(() => this.loadAssets());
  }
}
