import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root', })
export class Asset {
  private apiUrl = '/api/assets';

  constructor(private http: HttpClient) {}

  getAssets(token: string) {
    return this.http.get(this.apiUrl, {
      headers: { Authorization: `Bearer ${token}`}
    });
  }
}
