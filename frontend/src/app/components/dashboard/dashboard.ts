import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Chart, ArcElement, Tooltip, Legend, Title, DoughnutController } from 'chart.js';
import { Navbar } from '../navbar/navbar';
import { AssetService, Asset } from '../../services/asset';

Chart.register(ArcElement, Tooltip, Legend, Title, DoughnutController);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  assets: Asset[] = [];
  chart: any;

  constructor(
    private assetService: AssetService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadAssets();
  }

  loadAssets() {
    this.assetService.getAssets().subscribe({
      next: (res) => {
        this.assets = res as any[];
        this.cdr.detectChanges();
        this.buildChart();
      },
      error: (err) => console.error('Failed to load assets', err)
    });
  }

  buildChart() {
    if (!this.assets.length) return;
    const active = this.assets.filter( a => a.status==='Active').length;
    const maintenance = this.assets.filter( a => a.status==='Maintenance').length;
    const decommissioned = this.assets.filter( a => a.status==='Decommissioned').length;

    if (!this.chart) this.chart.destroy();

    this.chart = new Chart('assetChart', {
      type: 'doughnut',
      data: {
        labels: ['Active', 'Maintenance', 'Decommissioned'],
        datasets: [{
          data: [active, maintenance, decommissioned],
          backgroundColor: ['#28a745','#ffc107','#dc3545'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {position: 'bottom'},
          title: {
            display: true,
            text: 'Asset Status Breakdown'
          }
        }
      }
    });
  }

}
