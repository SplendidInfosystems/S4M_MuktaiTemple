import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,NavComponent, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
   sidebarOpen = false;
 screenIsSmall: boolean = false;
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  ngOnInit() {
  this.screenIsSmall = window.innerWidth < 768;
}


}
