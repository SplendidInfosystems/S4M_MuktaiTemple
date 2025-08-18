import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
  imports: [CommonModule],
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent {
   stats: StatCard[] = [
    { label: 'Total Followers',   value: '21.2k', change: '12.17%', trend: 'up' },
    { label: 'Impressions',       value: '1.6k',  change: '21.17%', trend: 'up' },
    { label: 'Reach',             value: '826',   change: '2.70%',  trend: 'down' },
    { label: 'Engagement Rate',   value: '18.2%', change: '19.71%', trend: 'up' }
  ];

  

}
