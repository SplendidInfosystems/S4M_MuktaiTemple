import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule,TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   menuOpen = false;

  currentLang: 'mr' | 'en' = 'mr';

  constructor(private translate: TranslateService, public route:Router) {
    this.translate.setDefaultLang('mr');
    this.translate.use('mr');
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'mr' ? 'en' : 'mr';
    this.translate.use(this.currentLang);
  }
  login(){
    this.route.navigate(['/login']);

  }
}
