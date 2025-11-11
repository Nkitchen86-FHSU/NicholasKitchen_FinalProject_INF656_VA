import { Component, OnInit } from '@angular/core';
import { Asset } from '../../services/asset';

@Component({
  selector: 'app-assets',
  imports: [],
  templateUrl: './assets.html',
  styleUrl: './assets.css',
})
export class Assets implements OnInit {
  assets: any[] = [];

  constructor(private assetService: Asset) {}

  ngOnInit() {
    this.loadAssets();
  }

  loadAssets() {
    this.assetService.getAssets().subscribe({
      next: (res) => this.assets = res as any[],
      error: (err) => console.error('Failed to load assets', err)
    });
  }

  deleteAsset(id: string) {
    if (!confirm('Delete this asset?')) return;
    this.assetService.deleteAsset(id).subscribe(() => this.loadAssets());
  }
}
