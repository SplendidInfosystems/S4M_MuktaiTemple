import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { DonationService } from '../../../core/services/donation/donation.service';
import { ToastService } from '../../../core/services/toast/toast.service';
import { LoaderService } from '../../../core/services/loader/loader.service';
import { environment } from '../../../../environments/environment';
import { AdminDashboardData } from '../../../core/models/interface-model';
import { finalize } from 'rxjs/operators';
import { TempleLocationService } from '../../../core/services/temple-state/temple-location.service';

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
  locationId!: number;

  private weeklyChart: Chart | null = null;
  private donationChart: Chart | null = null;
  private viewInitialized = false;

  constructor(
    private donationService: DonationService,
    private toast: ToastService,
    private loader: LoaderService,
    private templeState: TempleLocationService
  ) {
    this.adminId = this.resolveAdminId();
   

  }


  
ngOnInit(): void {
  if (!this.adminId) {
    this.toast.show('Admin ID not found. Please login again.', 'error');
    return;
  }

  // ✅ Listen to temple state
  this.templeState.locationId$.subscribe(id => {
    if (!id) return;

    this.locationId = id;

    // ✅ Now both adminId + locationId available
    this.loadAdminDashboardData(this.adminId!, this.locationId);
  });
}
  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.renderChartsIfReady();
  }

  ngOnDestroy(): void {
    this.weeklyChart?.destroy();
    this.donationChart?.destroy();
  }

  // ================= API =================

  loadAdminDashboardData(adminId: number, locationId: number): void {
    this.loader.show();
    this.donationService.getAdminDashboardData(adminId, locationId)
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
    return Number.isFinite(id) && id > 0 ? id : 5;
  }

  // ================= CHART RENDER =================

  private renderChartsIfReady(): void {
    if (!this.viewInitialized || !this.adminDashboardData) return;
    setTimeout(() => this.renderCharts(), 0);
  }

  private renderCharts(): void {
    if (!this.adminDashboardData) return;

    const weeklyChartElem = document.getElementById('weeklyChart') as HTMLCanvasElement | null;
    const donutChartElem = document.getElementById('donutChart2') as HTMLCanvasElement | null;

    if (!weeklyChartElem || !donutChartElem) return;

    this.weeklyChart?.destroy();
    this.donationChart?.destroy();

    const weeklyTrend = this.getWeeklyTrendData();

    // ================= WEEKLY BAR CHART =================
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
            beginAtZero: true,
            ticks: {
              callback: (value) => `₹${value}` // ✅ FIXED
            }
          }
        }
      }
    });

    // ================= DONUT CHART =================
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
          legend: { display: false }
        }
      }
    });
  }

  // ================= WEEKLY TREND PARSER =================
 private getWeeklyTrendData(): { labels: string[]; values: number[] } {
  const defaultLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const trend = this.adminDashboardData?.weekly_donation_trend;

  if (!trend) {
    return {
      labels: defaultLabels,
      values: defaultLabels.map(() => 0)
    };
  }

  // ✅ SAFE TYPE CHECK (Angular strict mode fix)
  if (
    Array.isArray(trend) &&
    trend.length > 0 &&
    typeof trend[0] === 'object' &&
    trend[0] !== null &&
    'day' in trend[0]
  ) {
    const typedTrend = trend as unknown as { day: string; amount: number }[];

    return {
      labels: typedTrend.map(d => d.day),
      values: typedTrend.map(d => Number(d.amount) || 0)
    };
  }

  return {
    labels: defaultLabels,
    values: defaultLabels.map(() => 0)
  };
}


  // ================= DONUT DISTRIBUTION =================
  private getDistributionData(): { cash: number; online: number } {
    const payload = this.adminDashboardData;
    if (!payload) return { cash: 0, online: 0 };

    const nested = payload.donation_distribution;

    if (nested && typeof nested === 'object') {
      return {
        cash: Number(nested.cash_percentage) || 0,
        online: Number(nested.online_percentage) || 0
      };
    }

    const cash = Number(payload.cash_donations ?? 0);
    const online = Number(payload.online_donations ?? 0);
    const total = cash + online;

    if (!total) return { cash: 0, online: 0 };

    return {
      cash: Number(((cash / total) * 100).toFixed(2)),
      online: Number(((online / total) * 100).toFixed(2))
    };
  }
}
