import {
  Component,
  HostListener,
  AfterViewInit,
  OnDestroy,
  NgZone,
  ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  isScrolled = false;
  isLoggedIn = false;
  isMobileMenuOpen = false;
  showDropdown = false;
  currentLang = 'mr';

  private scrollTarget: HTMLElement | Window = window;
  private scrollHandler = () => this.zone.run(() => this.updateScrollState());
    private mainScrollEl: HTMLElement | null = null;
 private boundMainScroll = () => this.zone.run(() => this.onMainScroll());
  private _mainPollTimer: any = null;
  private _mainPollAttempts = 0;
  debugAttach = false; // enable for console debug
  private scrollThreshold = 10; // px to consider "scrolled"


  constructor(
    private router: Router,
    private translate: TranslateService,
    private zone: NgZone,
    private cd: ChangeDetectorRef
  ) {
    this.translate.setDefaultLang(this.currentLang);
    this.translate.use(this.currentLang);
  }

  ngAfterViewInit() {
    // Try to attach to #pageMain if it exists
    const main = document.getElementById('pageMain');
    this.scrollTarget = main ?? window;

    this.scrollTarget.addEventListener('scroll', this.scrollHandler, { passive: true });
    this.updateScrollState();
     // Try to attach to inner scroller (#pageMain). If not present yet, poll a few times.
    this.tryAttachToMain();
   // Also initialise state from window (in case app uses window scrolling)
    this.updateScrollState();
  }

  ngOnDestroy() {
    this.scrollTarget.removeEventListener('scroll', this.scrollHandler as any);
     if (this.mainScrollEl) {
      this.mainScrollEl.removeEventListener('scroll', this.boundMainScroll);
      this.mainScrollEl = null;
    }
    if (this._mainPollTimer) {
      clearInterval(this._mainPollTimer);     
       this._mainPollTimer = null;
    }
  }

  private updateScrollState() {
    const threshold = 10;
    let scrolled = false;
        window.addEventListener('scroll', () => console.log(window.scrollY));


    if (this.scrollTarget instanceof Window) {
      scrolled = window.scrollY > threshold;
    } else {
      scrolled = this.scrollTarget.scrollTop > threshold;
    }

    if (this.isScrolled !== scrolled) {
      this.isScrolled = scrolled;
      this.cd.detectChanges();
    }
  }
   private onMainScroll(): void {
    // called inside NgZone via boundMainScroll
    this.updateScrollState();
  }




  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.scrollTarget === window) {
      this.zone.run(() => this.updateScrollState());
    }
    this.zone.run(() => this.updateScrollState());

  }

  // Dropdown, login/logout, and routing
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

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.isMobileMenuOpen = false;
  }
   private tryAttachToMain(): void {
   const attach = () => {
     const el = document.getElementById('pageMain') as HTMLElement | null;
     if (el) {
       if (this.debugAttach) console.debug('HeaderComponent: attached to #pageMain');
       this.mainScrollEl = el;
       this.mainScrollEl.addEventListener('scroll', this.boundMainScroll, { passive: true });
       if (this._mainPollTimer) { clearInterval(this._mainPollTimer); this._mainPollTimer = null; }
       // set state after attaching
       this.updateScrollState();
       return true;
      }
      return false;
    };

    if (!attach()) {
      this._mainPollAttempts = 0;
      this._mainPollTimer = setInterval(() => {
      this._mainPollAttempts++;
        if (attach() || this._mainPollAttempts > 20) {
          if (this._mainPollTimer) { clearInterval(this._mainPollTimer); this._mainPollTimer = null; }
        }
      }, 200);
    }
  }
}
