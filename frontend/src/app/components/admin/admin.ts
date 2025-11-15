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
  newUser = { username: '', password: '', role: 'user' };

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
        this.users = res;
        this.cdr.detectChanges();
      },
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
