import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-president-sidebar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './president-sidebar.component.html',
  styleUrl: './president-sidebar.component.css'
})
export class PresidentSidebarComponent {
  @Input() sidebarOpen = true;
  @Input() screenIsSmall = false;
  
   isSidebarOpen = false;
  
  
  
    @Output() close = new EventEmitter<void>();
  
    closeSidebar() {
      if (this.screenIsSmall) {
        this.close.emit();
      }
    }

}
