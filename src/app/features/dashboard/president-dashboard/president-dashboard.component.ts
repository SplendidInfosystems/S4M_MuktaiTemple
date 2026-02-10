import { Component,ViewChild,ElementRef ,AfterViewInit} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
  BarController,
  BarElement
} from 'chart.js';


Chart.register(
   BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
);

@Component({
  selector: 'app-president-dashboard',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './president-dashboard.component.html',
  styleUrl: './president-dashboard.component.css'
})
export class PresidentDashboardComponent {
   @ViewChild('monthlyChart') monthlyChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
   @ViewChild('templeChart') templeChart!: ElementRef<HTMLCanvasElement>;
  barChart!: Chart;

  constructor() {
    // 🔹 Register required Chart.js modules (MANDATORY in v4)
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      CategoryScale,
      Tooltip,
      Legend
    );

    
  }

  ngAfterViewInit(): void {
    this.createMonthlyChart();
   this.createTempleWiseChart();

  }

  createMonthlyChart() {
    this.chart = new Chart(this.monthlyChart.nativeElement, {
      type: 'line',

      data: {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],

        datasets: [
          {
            label: 'Muktainagar',
            data: [1120000, 1180000, 1150000, 1220000, 1280000, 1350000, 1240000],
            borderColor: '#FF6B35',
            backgroundColor: '#FF6B35',
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: '#ffffff',
            pointBorderWidth: 2,
            fill: false
          },
          {
            label: 'Kothali',
            data: [980000, 1020000, 990000, 1050000, 1100000, 1150000, 1040000],
            borderColor: '#F4B400',
            backgroundColor: '#F4B400',
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: '#ffffff',
            pointBorderWidth: 2,
            fill: false
          },
          {
            label: 'Pandharpur',
            data: [1050000, 1080000, 1060000, 1120000, 1180000, 1230000, 1140000],
            borderColor: '#34A853',
            backgroundColor: '#34A853',
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: '#ffffff',
            pointBorderWidth: 2,
            fill: false
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false, // IMPORTANT

        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `₹ ${context.parsed?.y?.toLocaleString() ?? '0'}`;
              }
            }
          }
        },

        scales: {
          x: {
            grid: {
              color: '#E5E7EB',
              lineWidth: 1,
              drawTicks: false
            },
            border: {
              display: false   // ✔ replaces drawBorder (v4 way)
            }
          },

          y: {
            beginAtZero: true,
            ticks: {
              padding: 10,
              callback: (value) => `₹ ${Number(value).toLocaleString()}`
            },
            grid: {
              color: '#E5E7EB',
              lineWidth: 1,
              drawTicks: false
            },
            border: {
              display: false   // ✔ replaces drawBorder
            }
          }
        }
      }
    });
  }

   createTempleWiseChart() {
    this.barChart = new Chart(this.templeChart.nativeElement, {
      type: 'bar',

      data: {
        labels: ['Muktainagar', 'Kothali', 'Pandharpur'],

        datasets: [
          {
            label: 'Daily',
            data: [45000, 38000, 42000],
            backgroundColor: '#FF6B35',
            borderRadius: 6,
            barThickness: 55
          },
          {
            label: 'Weekly',
            data: [320000, 280000, 300000],
            backgroundColor: '#E3B341',
            borderRadius: 6,
            barThickness: 55
          },
          {
            label: 'Monthly',
            data: [1250000, 1050000, 1150000],
            backgroundColor: '#22C55E',
            borderRadius: 6,
            barThickness: 55
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'rectRounded',
              padding: 20
            }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                return `₹ ${ctx.parsed?.y?.toLocaleString() ?? '0'}`;
              }
            }
          }
        },

        scales: {
          x: {
            grid: {
              drawTicks: false,
              color: '#E5E7EB'
            },
            border: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              padding: 10,
              callback: (value) => `₹ ${Number(value).toLocaleString()}`
            },
            grid: {
              drawTicks: false,
              color: '#E5E7EB'
            },
            border: {
              display: false
            }
          }
        }
      }
    });
  }

}
