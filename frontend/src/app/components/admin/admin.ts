import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService, User } from '../../services/admin'
import { Navbar } from '../navbar/navbar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, Navbar, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit{
  users: User[] = [];
  editingId: string | null=null;
  newUser = { username: '', password: '', role: 'user' };

  sortOption: string = '';
  filter = {
    role: new Set<string>(),
  }
  originalUsers: User[] = [];

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res as any[];
        this.originalUsers = [ ...this.users ];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading users', err),
    });
  }

  // Following 3 functions are used to create or update a user.
  // Open the modal and populate the information with the selected user.
  openEditModal(user: User) {
    this.editingId = user._id;
    this.newUser = {
      username: user.username,
      role: user.role,
      password: ''
    };
  }

  // Update or create the user depending if it has an editingId.
  saveUser() {
    if (this.editingId) {
      const updateData: any = {username: this.newUser.username, role: this.newUser.role};
      if (this.newUser.password.trim().length > 0) updateData.password = this.newUser.password;
      this.adminService.updateUser(this.editingId, updateData).subscribe(() => this.finishSave())
    } else {
      this.adminService.createUser(this.newUser).subscribe(() => {
        this.finishSave();
      });
    }
  }

  // Reset the newUser and editingId field. Reload users.
  finishSave() {
    this.newUser = { username: '', password: '', role: 'user' };
    this.editingId = null;
    this.loadUsers();
  }

  // Delete selected user.
  deleteUser(id: string) {
    if (!confirm('Delete user?')) return;
    this.adminService.deleteUser(id).subscribe(() => this.loadUsers());
  }

  // Sort the user list by username or role
  sortUsers() {
    if (!this.sortOption) return;

    this.users.sort((a,b) => {
      switch(this.sortOption) {
        case 'username-asc': return a.username.localeCompare(b.username);
        case 'username-desc': return b.username.localeCompare(a.username);

        case 'role-asc': return (a.role || '').localeCompare(b.role || '');
        case 'role-desc': return (b.role || '').localeCompare(a.role || '');
      }
      return 0;
    });
  }

  // Toggle function for filter.
  toggleFilter(set: Set<string>, value: string) {
    if (set.has(value)) set.delete(value);
    else set.add(value);

    this.filterUsers();
  }

  // Filter the user list by role.
  filterUsers() {
    this.users = this.originalUsers.filter(users => {
      const roleMatch = this.filter.role.size === 0 || this.filter.role.has(users.role);

      return roleMatch;
    });

    this.sortUsers();
  }
}
