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
 @Output() sidebarToggle = new EventEmitter<void>();

  toggle() {
    this.sidebarToggle.emit(); // Call from template button
  }


}
