import { Component, HostListener, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,TranslateModule ,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  
  isLoggedIn = false; // Change this to real auth check
          currentLang = 'mr';
  isScrolled: boolean = false;


    // will inject NgZone to ensure scroll callbacks update Angular view
  
    constructor(private auth: AuthService, private router: Router, private translate: TranslateService, private ngZone: NgZone) {
       this.translate.setDefaultLang(this.currentLang);
      this.translate.use(this.currentLang);
     }

      isMobileMenuOpen: boolean = false;

        showDropdown = false;
  private mainScrollEl: HTMLElement | null = null;
  // bound handler will call onMainScroll inside Angular zone
  private boundMainScroll = () => this.ngZone.run(() => this.onMainScroll());
  private _mainPollTimer: any = null;
  private _mainPollAttempts = 0;
  private debugAttach = false;
  private scrollThreshold = 10; 
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

    @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Update state when the window scrolls
    this.updateScrolledState();
  }

  ngAfterViewInit(): void {
    // Try to find and attach to #pageMain. It may not exist yet when header mounts
    this.tryAttachToMain();
    // run initial update in case window already scrolled
    this.updateScrolledState();
  }

  ngOnDestroy(): void {
    if (this.mainScrollEl) {
      this.mainScrollEl.removeEventListener('scroll', this.boundMainScroll);
      this.mainScrollEl = null;
    }
    if (this._mainPollTimer) {
      clearInterval(this._mainPollTimer);
      this._mainPollTimer = null;
    }
  }
  

  private onMainScroll(): void {
    // Update state when inner element scrolls
    this.updateScrolledState();
  }

  private updateScrolledState() {
   const windowScrolled = (window && window.scrollY) ? window.scrollY > this.scrollThreshold : false;
    const elScrolled = this.mainScrollEl ? this.mainScrollEl.scrollTop > this.scrollThreshold : false;
    const newState = windowScrolled || elScrolled;
    if (this.isScrolled !== newState) {
      this.isScrolled = newState;
    }
    if (this.debugAttach) {
      console.debug('HeaderComponent: windowScroll=', window.scrollY, 'elScroll=', this.mainScrollEl?.scrollTop, 'isScrolled=', this.isScrolled);
    }
  }

  // Try to attach to the pageMain element. Poll a few times because home component
  // might render after the header.
  private tryAttachToMain() {
    const attach = () => {
      const el = document.getElementById('pageMain') as HTMLElement | null;
      if (el) {
        if (this.debugAttach) console.debug('HeaderComponent: attached to #pageMain');
        this.mainScrollEl = el;
        this.mainScrollEl.addEventListener('scroll', this.boundMainScroll, { passive: true });
        if (this._mainPollTimer) {
          clearInterval(this._mainPollTimer);
          this._mainPollTimer = null;
        }
        // set initial state after attaching
        this.updateScrolledState();
        return true;
      }
      return false;
    };
    if (!attach()) {
      // poll briefly (every 200ms, max 15 attempts ~3s)
      this._mainPollAttempts = 0;
      this._mainPollTimer = setInterval(() => {
        this._mainPollAttempts++;
        if (attach() || this._mainPollAttempts > 15) {
          if (this._mainPollTimer) {
            clearInterval(this._mainPollTimer);
            this._mainPollTimer = null;
          }
        }
      }, 200);
    }
  }

  // optional debug flag

  
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
