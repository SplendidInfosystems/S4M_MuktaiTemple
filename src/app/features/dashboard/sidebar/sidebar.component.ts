import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
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