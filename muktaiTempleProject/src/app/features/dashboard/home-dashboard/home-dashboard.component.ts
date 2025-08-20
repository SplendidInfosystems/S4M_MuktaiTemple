import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { TranslateModule } from '@ngx-translate/core';


type Trend = 'up' | 'down' | null;
interface StatCard {
  label: string;
  value: string | number;
  change?: string;  // e.g. "12.17%"
  trend?: Trend;    // 'up' | 'down' | null
}

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule ,TranslateModule],
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent {
 // Stats Cards
  stats = [
    { label: 'DAILY_DONORS', value: '21.2k', change: '12.17%', trend: 'up' },
    { label: 'TOTAL_DONATIONS', value: '20k', change: '21.17%', trend: 'up' },
    { label: 'DAILY_EXPENSES', value: '₹18.2k', change: '19.71%', trend: 'up' },
    { label: 'TOTAL_EXPENSES', value: '₹826k', change: '2.70%', trend: 'down' }
  ];

  selectedView: 'DAILY_REPORT' | 'MONTHLY_REPORT' = 'DAILY_REPORT';

  // Donut Chart (Donations vs Expenses)
  donutChartType: any = 'doughnut';
  donutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Donations', 'Expenses'],
    datasets: [
      {
        data: [50000, 60600],
        backgroundColor: ['#34d399', '#f87171'],
        hoverBackgroundColor: ['#10b981', '#ef4444']
      }
    ]
  };

  // Pie Chart (DAILY_REPORT / MONTHLY_REPORT Reports)
  pieChartType: any = 'pie';
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Donors', 'Expenses'],
    datasets: [
      {
        data: [21200, 18200],
        backgroundColor: ['#3b82f6', '#f59e0b'],
        hoverBackgroundColor: ['#2563eb', '#d97706']
      }
    ]
  };

  // Chart Options
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          font: { size: 12 }
        }
      }
    }
  };

  // Toggle View (DAILY_REPORT / MONTHLY_REPORT)
  changeView(view: 'DAILY_REPORT' | 'MONTHLY_REPORT') {
    this.selectedView = view;
    if (view === 'DAILY_REPORT') {
      this.pieChartData.datasets[0].data = [21200, 18200]; // Daily data
    } else {
      this.pieChartData.datasets[0].data = [600000, 300000]; // Monthly data
    }
  }
}
