import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../features/dashboard/sidebar/sidebar.component';
import { PresidentSidebarComponent } from '../../features/dashboard/president-sidebar/president-sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    PresidentSidebarComponent,
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  role: 'admin' | 'president' | null = null;

  sidebarOpen = false;
  screenIsSmall = false;

  open = false;
  selectedTemple = 'Muktainagar';
  temples = ['Muktainagar', 'Kothali', 'Pandharpur'];

  ngOnInit() {
    this.role = localStorage.getItem('role') as 'admin' | 'president';
    this.checkScreen();
  }

  @HostListener('window:resize')
  checkScreen() {
    this.screenIsSmall = window.innerWidth < 768;

    if (this.screenIsSmall) {
      this.sidebarOpen = false; // closed by default in mobile
    } else {
      this.sidebarOpen = true; // always open in desktop
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  selectTemple(t: string) {
    this.selectedTemple = t;
    this.open = false;
  }
}
