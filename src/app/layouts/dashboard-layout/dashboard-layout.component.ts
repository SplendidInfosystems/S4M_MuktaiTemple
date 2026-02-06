import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../features/dashboard/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [SidebarComponent,RouterOutlet,CommonModule  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {


    open = false;
selectedTemple = 'Muktainagar';
temples = ['Muktainagar', 'Kothali', 'Pandharpur'];

selectTemple(t: string) {
  this.selectedTemple = t;
  this.open = false;
}
  @ViewChild('sidebarRef', { read: ElementRef }) sidebarRef!: ElementRef;
  @ViewChild('toggleBtnRef', { read: ElementRef }) toggleBtnRef!: ElementRef;
  sidebarOpen = false;
  screenIsSmall = false;

  ngOnInit() {
    this.checkScreen();
  }

  @HostListener('window:resize')
  checkScreen() {
    this.screenIsSmall = window.innerWidth < 768;
    if (!this.screenIsSmall) {
      this.sidebarOpen = true; // desktop always open
    }
  }

  openSidebar() {
    this.sidebarOpen = true;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }
}
