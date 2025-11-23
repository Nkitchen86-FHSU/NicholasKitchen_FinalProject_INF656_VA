import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
export class Dashboard implements OnInit, AfterViewInit {
  assets: Asset[] = [];

  @ViewChild('assetChart') chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart: Chart | null = null;
  viewReady = false;

  constructor(
    private assetService: AssetService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadAssets();
  }

  ngAfterViewInit() {
    this.viewReady=true;
    this.tryBuildChart();
  }

  loadAssets() {
    this.assetService.getAssets().subscribe({
      next: (res) => {
        this.assets = res as any[];
        this.cdr.detectChanges();
        this.tryBuildChart();
      },
      error: (err) => console.error('Failed to load assets', err)
    });
  }

  tryBuildChart() {
    if (this.viewReady && this.assets.length > 0) {
      this.buildChart();
    }
  }

  buildChart() {
    if (!this.assets.length) return;
    const active = this.assets.filter( a => a.status==='Active').length;
    const maintenance = this.assets.filter( a => a.status==='Maintenance').length;
    const decommissioned = this.assets.filter( a => a.status==='Decommissioned').length;

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(this.chartCanvas.nativeElement, {
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
