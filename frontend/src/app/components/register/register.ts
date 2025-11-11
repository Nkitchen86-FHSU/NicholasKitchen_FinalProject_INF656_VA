import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username = '';
  password = '';

  constructor(private auth: Auth, private router: Router) {}

  onRegister() {
    this.auth.register({ username: this.username, password: this.password }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => alert(err.error?.message || 'Registration failed'),
    });
  }
}
