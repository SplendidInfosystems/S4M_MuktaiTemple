import {
  Component,
  ViewChild,
  ElementRef,
  OnInit
} from '@angular/core';
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

import { ToastService } from '../../../core/services/toast/toast.service';
import { DonationService } from '../../../core/services/donation/donation.service';
import { PresidentDashboardResponse } from '../../../core/models/interface-model';
import { CommonModule } from '@angular/common';

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
  imports: [TranslateModule,CommonModule],
  templateUrl: './president-dashboard.component.html',
  styleUrl: './president-dashboard.component.css'
})
export class PresidentDashboardComponent implements OnInit {

  dashboardData!: PresidentDashboardResponse['body'];

  @ViewChild('monthlyChart') monthlyChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('templeChart') templeChart!: ElementRef<HTMLCanvasElement>;

  chart!: Chart;
  barChart!: Chart;

  constructor(
    private donationService: DonationService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.donationService.getPresidentDashboard().subscribe({
      next: (res) => {
        this.dashboardData = res.body;
          this.toast.show('President dashboard data Loaded successfully', 'success');

        setTimeout(() => {
          this.createMonthlyChart();
          this.createTempleWiseChart();
        });
      },
      error: (err) => {
        console.error('Dashboard API error', err);
        this.toast.showError('Failed to load dashboard');
      }
    });
  }

  // ================= MONTHLY LINE CHART =================

  createMonthlyChart() {

    if (this.chart) {
      this.chart.destroy();
    }

    const grouped: any = {};

    this.dashboardData.monthly_trend.forEach(item => {
      if (!grouped[item.location]) {
        grouped[item.location] = {};
      }
      grouped[item.location][item.month] = item.total;
    });

    const months = [...new Set(
      this.dashboardData.monthly_trend.map(m => m.month)
    )];

    const colors = ['#FF6B35', '#F4B400', '#34A853'];

    const datasets = Object.keys(grouped).map((location, index) => ({
      label: location,
      data: months.map(month => grouped[location][month] || 0),
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length],
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: '#ffffff',
      pointBorderWidth: 2,
      fill: false
    }));

    this.chart = new Chart(this.monthlyChart.nativeElement, {
      type: 'line',
      data: {
        labels: months,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
              label: (context) =>
                `₹ ${context.parsed?.y?.toLocaleString() ?? '0'}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: '#E5E7EB', drawTicks: false },
            border: { display: false }
          },
          y: {
            beginAtZero: true,
            ticks: {
              padding: 10,
              callback: (value) =>
                `₹ ${Number(value).toLocaleString()}`
            },
            grid: { color: '#E5E7EB', drawTicks: false },
            border: { display: false }
          }
        }
      }
    });
  }

  // ================= TEMPLE BAR CHART =================

  createTempleWiseChart() {

    if (this.barChart) {
      this.barChart.destroy();
    }

    const labels = this.dashboardData.temple_comparison.map(t => t.location);

    this.barChart = new Chart(this.templeChart.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Daily',
            data: this.dashboardData.temple_comparison.map(t => t.daily),
            backgroundColor: '#FF6B35',
            borderRadius: 6,
            barThickness: 55
          },
          {
            label: 'Weekly',
            data: this.dashboardData.temple_comparison.map(t => t.weekly),
            backgroundColor: '#E3B341',
            borderRadius: 6,
            barThickness: 55
          },
          {
            label: 'Monthly',
            data: this.dashboardData.temple_comparison.map(t => t.monthly),
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
              label: (ctx) =>
                `₹ ${ctx.parsed?.y?.toLocaleString() ?? '0'}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: '#E5E7EB', drawTicks: false },
            border: { display: false }
          },
          y: {
            beginAtZero: true,
            ticks: {
              padding: 10,
              callback: (value) =>
                `₹ ${Number(value).toLocaleString()}`
            },
            grid: { color: '#E5E7EB', drawTicks: false },
            border: { display: false }
          }
        }
      }
    });
  }
}
