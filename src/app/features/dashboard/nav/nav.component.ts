import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  @Output() toggleSidebar = new EventEmitter<void>();

   showDropdown = false;
  currentLang = 'en';


  toggle(): void {
    this.toggleSidebar.emit();
  }
  
 constructor( private auth: AuthService,private translate: TranslateService , private router:Router) {
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
  openProfile(){
    this.router.navigate(['/dashboard/create-profile']);

  }
  logout(){
   this.auth.logout();
   this.router.navigate(['/login']);

  }
  openNotifications(){
    this.router.navigate(['/dashboard/notification']);
  }

}
