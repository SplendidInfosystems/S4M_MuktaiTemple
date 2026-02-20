import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../features/dashboard/sidebar/sidebar.component';
import { PresidentSidebarComponent } from '../../features/dashboard/president-sidebar/president-sidebar.component';
import { DonationService } from '../../core/services/donation/donation.service';
import { TempleLocation } from '../../core/models/interface-model';
import { TempleLocationService } from '../../core/services/temple-state/temple-location.service';

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

  constructor(private templeservice: DonationService,
      private templeState: TempleLocationService

  ) {}


  role: 'admin' | 'president' | null = null;

  sidebarOpen = false;
  screenIsSmall = false;

  open = false;
  selectedTemple = 'Muktainagar';
temples: string[] = [];
locations: TempleLocation[] = [];
selectedLocationId!: number;


ngOnInit() {
  this.role = localStorage.getItem('role') as 'admin' | 'president';
  this.checkScreen();
  this.loadTemples();
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

selectTemple(name: string) {
  this.selectedTemple = name;
  this.open = false;

  const loc = this.locations.find(l => l.location_name === name);
  if (loc) {
    this.selectedLocationId = loc.location_id;

    // 🔥 Notify entire app
    this.templeState.setLocation(loc.location_id);
  }
}

loadTemples() {
  this.templeservice.getTempleLocations().subscribe({
    next: (res) => {
      this.locations = res;
      this.temples = res.map(l => l.location_name);

      // ✅ SET DEFAULT TEMPLE + PUSH TO GLOBAL STATE
      if (this.locations.length) {
        const first = this.locations[0];

        this.selectedTemple = first.location_name;
        this.selectedLocationId = first.location_id;

        // 🔥 THIS LINE WAS MISSING
        this.templeState.setLocation(first.location_id);
      }
    },
    error: (err) => {
      console.error('Temple API failed', err);
      this.temples = [];
    }
  });
}

}
