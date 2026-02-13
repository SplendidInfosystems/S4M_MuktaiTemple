import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { DonationService } from '../../../core/services/donation/donation.service';
import { ToastService } from '../../../core/services/toast/toast.service';
import { LoaderService } from '../../../core/services/loader/loader.service';
import { environment } from '../../../../environments/environment';
import { AdminDashboardData } from '../../../core/models/interface-model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements AfterViewInit, OnDestroy {
  adminDashboardData: AdminDashboardData | null = null;
  adminId: number | null = null;
  distributionData = { cash: 0, online: 0 };

  open = false;
  selectedTemple = 'Muktainagar';
  temples = ['Muktainagar', 'Kothali', 'Pandharpur'];

  private weeklyChart: Chart | null = null;
  private donationChart: Chart | null = null;
  private viewInitialized = false;

  constructor(
    private donationService: DonationService,
    private toast: ToastService,
    private loader: LoaderService
  ) {
    this.adminId = this.resolveAdminId();
    if (this.adminId === null) {
      this.toast.show('Admin ID not found. Please login again.', 'error');
      return;
    }

    this.loadAdminDashboardData(this.adminId);
  }

  selectTemple(t: string) {
    this.selectedTemple = t;
    this.open = false;
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.renderChartsIfReady();
  }

  ngOnDestroy(): void {
    this.weeklyChart?.destroy();
    this.donationChart?.destroy();
  }

  loadAdminDashboardData(id: number): void {
    this.loader.show();
    this.donationService.getAdminDashboardData(id)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: (res) => {
          this.adminDashboardData = ('body' in res ? res.body : res) ?? null;
          this.distributionData = this.getDistributionData();
          this.renderChartsIfReady();
          this.toast.show('Admin dashboard data loaded successfully', 'success');
        },
        error: (err) => {
          this.toast.show('Failed to load admin dashboard data', 'error');
          if (!environment.production) console.error(err);
        }
      });
  }

  private resolveAdminId(): number | null {
    const id = Number(localStorage.getItem('admin_id'));
    if (Number.isFinite(id) && id > 0) {
      return id;
    }

    return 5;
  }

  private renderChartsIfReady(): void {
    if (!this.viewInitialized || !this.adminDashboardData) {
      return;
    }

    // charts are inside *ngIf, so render after DOM updates
    setTimeout(() => this.renderCharts(), 0);
  }

  private renderCharts(): void {
    if (!this.adminDashboardData) {
      return;
    }

    const weeklyChartElem = document.getElementById('weeklyChart') as HTMLCanvasElement | null;
    const donutChartElem = document.getElementById('donutChart2') as HTMLCanvasElement | null;

    if (!weeklyChartElem || !donutChartElem) {
      return;
    }

    this.weeklyChart?.destroy();
    this.donationChart?.destroy();

    const weeklyTrend = this.getWeeklyTrendData();
    this.weeklyChart = new Chart(weeklyChartElem, {
      type: 'bar',
      data: {
        labels: weeklyTrend.labels,
        datasets: [{
          data: weeklyTrend.values,
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
              callback: (value) => `?${value}`
            }
          }
        }
      }
    });

    this.donationChart = new Chart(donutChartElem, {
      type: 'doughnut',
      data: {
        labels: ['Cash', 'Online'],
        datasets: [{
          data: [this.distributionData.cash, this.distributionData.online],
          backgroundColor: ['#FF6B35', '#D6B23A'],
          borderColor: '#FFFFFF',
          borderWidth: 2
        }]
      },
      options: {
        responsive: false,
        cutout: '0%',
        rotation: -90,
        circumference: 360,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        }
      }
    });
  }

private getWeeklyTrendData(): { labels: string[]; values: number[] } {
  const defaultLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const trend = this.adminDashboardData?.weekly_donation_trend;

  if (!trend) {
    return {
      labels: defaultLabels,
      values: defaultLabels.map(() => 0)
    };
  }

  // Case 1: Array of numbers
  if (Array.isArray(trend)) {
    return {
      labels: defaultLabels.slice(0, trend.length),
      values: trend.map(v => Number(v) || 0)
    };
  }

  // Case 2: Object with labels and values
  if (
    typeof trend === 'object' &&
    'labels' in trend &&
    'values' in trend
  ) {
    const t = trend as { labels: string[]; values: number[] };

    if (Array.isArray(t.labels) && Array.isArray(t.values)) {
      return {
        labels: t.labels,
        values: t.values.map(v => Number(v) || 0)
      };
    }
  }

  // Case 3: Key-value object
  if (typeof trend === 'object') {
    const labels = Object.keys(trend);

    return {
      labels,
      values: labels.map(label => Number((trend as Record<string, number>)[label]) || 0)
    };
  }

  return {
    labels: defaultLabels,
    values: defaultLabels.map(() => 0)
  };
}


 private getDistributionData(): { cash: number; online: number } {
  const payload = this.adminDashboardData;

  if (!payload) {
    return { cash: 0, online: 0 };
  }

  const nested = payload.donation_distribution;

  // Case 1: nested object
  if (nested && typeof nested === 'object') {
    return {
      cash: Number(nested.cash_percentage) || 0,
      online: Number(nested.online_percentage) || 0
    };
  }

  // Case 2: direct percentage fields
  const cash = Number(payload.cash_percentage ?? 0);
  const online = Number(payload.online_percentage ?? 0);

  if (cash > 0 || online > 0) {
    return { cash, online };
  }

  // Case 3: calculate from donation amounts
  const cashDonations = Number(payload.cash_donations ?? 0);
  const onlineDonations = Number(payload.online_donations ?? 0);
  const total = cashDonations + onlineDonations;

  if (total === 0) {
    return { cash: 0, online: 0 };
  }

  return {
    cash: Number(((cashDonations / total) * 100).toFixed(2)),
    online: Number(((onlineDonations / total) * 100).toFixed(2))
  };
}

}
