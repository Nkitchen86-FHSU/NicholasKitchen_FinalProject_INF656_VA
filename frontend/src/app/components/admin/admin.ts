import { Component, OnInit } from '@angular/core';
import { AdminService, User } from '../../services/admin'

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit{
  users: User[] = [];
  newUser = { username: '', password: '', role: 'user' };

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe({
      next: (res) => this.users = res,
      error: (err) => console.error('Error loading users', err),
    });
  }

  createUser() {
    this.adminService.createUser(this.newUser).subscribe(() => {
      this.newUser = { username: '', password: '', role: 'user' };
      this.loadUsers();
    });
  }

  deleteUser(id: string) {
    if (!confirm('Delete user?')) return;
    this.adminService.deleteUser(id).subscribe(() => this.loadUsers());
  }
}
