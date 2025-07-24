import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
     constructor(private auth: AuthService, private router: Router) {}

      isMobileMenuOpen: boolean = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  
    logout() {
      this.auth.logout();
      this.router.navigate(['/login']);
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


}
