import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, ArcElement, Tooltip, Legend, Title, DoughnutController } from 'chart.js';
import { Navbar } from '../navbar/navbar';

Chart.register(ArcElement, Tooltip, Legend, Title, DoughnutController);

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements AfterViewInit {
  ngAfterViewInit() {
    new Chart('assetChart', {
      type: 'doughnut',
      data: {
        labels: ['Active', 'Maintenance', 'Decommissioned'],
        datasets: [{
          data: [12, 5, 2],
        }]
      },
    });
  }
}
