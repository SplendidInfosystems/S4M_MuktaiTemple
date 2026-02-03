import { AfterViewInit, Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements AfterViewInit {

    ngAfterViewInit() {
    new Chart('weeklyChart', {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          data: [35000, 42000, 38000, 41000, 52000, 65000, 78000],
          backgroundColor: '#FF6B35',
          borderRadius: 8
        }]
      },
      options: {
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            ticks: {
              callback: value => '₹' + value
            }
          }
        }
      }
    });

    new Chart('donutChart', {
      type: 'doughnut',
      data: {
        labels: ['Cash', 'Online'],
        datasets: [{
          data: [63, 37],
          backgroundColor: ['#FF6B35', '#FACC15'],
          borderWidth: 0
        }]
      },
      options: {
        cutout: '65%',
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

}
