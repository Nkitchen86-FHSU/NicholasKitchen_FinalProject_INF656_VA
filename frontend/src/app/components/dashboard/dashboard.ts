import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  imports: [],
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
