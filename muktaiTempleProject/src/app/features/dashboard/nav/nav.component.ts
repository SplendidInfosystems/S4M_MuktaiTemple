import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
    @Output() toggleSidebarEvent = new EventEmitter<void>();

   sidebarOpen = false;

   onToggleSidebar() {
    this.toggleSidebarEvent.emit();
  }


}
