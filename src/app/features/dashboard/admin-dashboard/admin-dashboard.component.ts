import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements AfterViewInit {

  open = false;
selectedTemple = 'Muktainagar';
temples = ['Muktainagar', 'Kothali', 'Pandharpur'];

selectTemple(t: string) {
  this.selectedTemple = t;
  this.open = false;
}


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

const donutChart2Elem = document.getElementById('donutChart2') as HTMLCanvasElement | null;
if (donutChart2Elem) {
  new Chart(donutChart2Elem, {
    type: 'doughnut',
    data: {
      labels: ['Cash', 'Online'],
      datasets: [{
        data: [63, 37],
        backgroundColor: [
          '#FF6B35', // Cash
          '#D6B23A'  // Online (gold)
        ],
        borderColor: '#FFFFFF',
        borderWidth: 2   // 🔥 white separation like Figma
      }]
    },
    options: {
      responsive: false,
      cutout: '0%',        // 🔥 makes it look like pie (NOT hollow)
      rotation: -90,       // start from top
      circumference: 360,  // full circle
      plugins: {
        legend: {
          display: false   // ❌ no legend box
        },
        tooltip: {
          enabled: true
        }
      }
    }
  });
}

  }

}
