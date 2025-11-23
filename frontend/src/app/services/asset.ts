import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Asset {
  _id: string;
  name: string;
  category: string;
  serialNumber: string;
  assignedUser: string;
  purchaseDate: string;
  warranty: string;
  status: string;
}

@Injectable({ providedIn: 'root', })
export class AssetService {
  private apiUrl = '/api/assets';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}`} : {}),
    });
  }

  getAssets(): Observable<Asset[]> { 
    return this.http.get<Asset[]>(this.apiUrl, {
      headers: this.getHeaders(),
    }); 
  }

  createAsset(asset: Partial<Asset>): Observable<Asset> { 
    return this.http.post<Asset>(this.apiUrl, asset, {
      headers: this.getHeaders(),
    }); 
  }

  updateAsset(id: string, asset: Partial<Asset>): Observable<Asset> { 
    return this.http.put<Asset>(`${this.apiUrl}/${id}`, asset, {
      headers: this.getHeaders(),
    }); 
  }

  deleteAsset(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    }); 
  }
}