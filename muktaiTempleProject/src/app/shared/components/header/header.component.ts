import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule,TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLoggedIn = false;
  isScrolled = false;
  isMobileMenuOpen = false;
  showDropdown = false;
  currentLang = 'mr';

  constructor(private router: Router, private translate: TranslateService) {
    this.translate.setDefaultLang(this.currentLang);
    this.translate.use(this.currentLang);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollTop > 10;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  setLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    this.showDropdown = false;
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.isLoggedIn = false;
  }

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.isMobileMenuOpen = false;
  }
}
