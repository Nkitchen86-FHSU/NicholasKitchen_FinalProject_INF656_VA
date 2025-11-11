import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  _id?: string;
  username: string;
  role: 'admin' | 'tech' | 'user';
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = '/api/admin';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`, {
      headers: this.getHeaders(),
    });
  }

  createUser(userData: { username: string; password: string; role: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/user`, userData, {
      headers: this.getHeaders(),
    });
  }

  updateUser(id: string, updateData: Partial<User>): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/${id}`, updateData, {
      headers: this.getHeaders(),
    });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
