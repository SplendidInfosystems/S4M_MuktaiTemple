import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavComponent, SidebarComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
@ViewChild('sidebarRef', { read: ElementRef }) sidebarRef!: ElementRef;
@ViewChild('toggleBtnRef', { read: ElementRef }) toggleBtnRef!: ElementRef;

  screenIsSmall = false;
  sidebarOpen = true;

  constructor(private breakpointObserver: BreakpointObserver, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result => {
      this.screenIsSmall = result.matches;
      this.sidebarOpen = !this.screenIsSmall;
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

@HostListener('document:click', ['$event'])
handleOutsideClick(event: MouseEvent): void {
  if (!this.screenIsSmall || !this.sidebarOpen) return;

  const sidebarEl = this.sidebarRef?.nativeElement;
  const toggleBtnEl = this.toggleBtnRef?.nativeElement;

  if (!sidebarEl || !toggleBtnEl) return; // if not initialized yet

  const target = event.target as HTMLElement;

  const clickedInsideSidebar = sidebarEl.contains(target);
  const clickedToggleButton = toggleBtnEl.contains(target);

  if (!clickedInsideSidebar && !clickedToggleButton) {
    this.sidebarOpen = false;
  }
}

}