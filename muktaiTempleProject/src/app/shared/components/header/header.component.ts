import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn = false; // Change this to real auth check

     constructor(private auth: AuthService, private router: Router,private translate: TranslateService) {
       this.translate.setDefaultLang(this.currentLang);
      this.translate.use(this.currentLang);
     }

      isMobileMenuOpen: boolean = false;

        showDropdown = false;
        currentLang = 'en';
      
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  
    logout() {

       this.isLoggedIn = false;
    }
    login(){
      this.router.navigate(['/login'])
    }
  description: { text: string } = {
    text: 'Saint Muktabai, also known as Muktai, was a revered 13th-century saint in the Varkari tradition and the younger sister of Saint Dnyaneshwar. She is celebrated for her deep spiritual insight and poetic contributions, which continue to inspire followers of the Bhakti movement. One of the prominent temples dedicated to her is located in Mehun, near Muktainagar in the Jalgaon district of Maharashtra',
  };
  
  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.isMobileMenuOpen = false; // close menu on mobile after click
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
