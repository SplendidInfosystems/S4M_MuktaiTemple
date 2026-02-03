import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../../features/dashboard/nav/nav.component';
import { SidebarComponent } from '../../features/dashboard/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [SidebarComponent,NavComponent,RouterOutlet,CommonModule  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  @ViewChild('sidebarRef', { read: ElementRef }) sidebarRef!: ElementRef;
  @ViewChild('toggleBtnRef', { read: ElementRef }) toggleBtnRef!: ElementRef;
  
    screenIsSmall = false;
    sidebarOpen = true;
  
    constructor(private breakpointObserver: BreakpointObserver, private elementRef: ElementRef) {}
  
    ngOnInit(): void {
      this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe((result: { matches: boolean; }) => {
        this.screenIsSmall = result.matches;
        this.sidebarOpen = !this.screenIsSmall;
      });
    }
  
    toggleSidebar(): void {
      this.sidebarOpen = !this.sidebarOpen;
    }
  
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent): void {
    if (!this.screenIsSmall || !this.sidebarOpen) {return;}
  
    const sidebarEl = this.sidebarRef?.nativeElement;
    const toggleBtnEl = this.toggleBtnRef?.nativeElement;
  
    if (!sidebarEl || !toggleBtnEl) {return;} // if not initialized yet
  
    const target = event.target as HTMLElement;
  
    const clickedInsideSidebar = sidebarEl.contains(target);
    const clickedToggleButton = toggleBtnEl.contains(target);
  
    if (!clickedInsideSidebar && !clickedToggleButton) {
      this.sidebarOpen = false;
    }
  }
}
