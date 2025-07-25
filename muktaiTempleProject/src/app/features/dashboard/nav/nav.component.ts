import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
 @Output() toggleSidebar = new EventEmitter<void>();

   showDropdown = false;
  currentLang = 'en';


  toggle(): void {
    this.toggleSidebar.emit();
  }


 constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.currentLang);
    this.translate.use(this.currentLang);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  setLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    this.showDropdown = false; // Close dropdown
  }
}
