import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

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
  imports: [CommonModule, NgChartsModule],
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent {
 // Stats Cards
  stats = [
    { label: 'Daily Donors', value: '21.2k', change: '12.17%', trend: 'up' },
    { label: 'Total Donations', value: '20k', change: '21.17%', trend: 'up' },
    { label: 'Daily Expenses', value: '₹18.2k', change: '19.71%', trend: 'up' },
    { label: 'Total Expenses', value: '₹826k', change: '2.70%', trend: 'down' }
  ];

  selectedView: 'daily' | 'monthly' = 'daily';

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

  // Pie Chart (Daily / Monthly Reports)
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

  // Toggle View (Daily / Monthly)
  changeView(view: 'daily' | 'monthly') {
    this.selectedView = view;
    if (view === 'daily') {
      this.pieChartData.datasets[0].data = [21200, 18200]; // Daily data
    } else {
      this.pieChartData.datasets[0].data = [600000, 300000]; // Monthly data
    }
  }
}
