import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  ViewChild,
  OnInit,
  OnDestroy
} from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { TranslateModule } from '@ngx-translate/core';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule, GoogleMapsModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @ViewChild('scrollContainer') scrollContainerRef!: ElementRef;

  isDialogOpen = false;
  dialogTitle = '';
  dialogContent = '';

  // 1. Define ViewChild to get a reference to the element with the #scrollContainer template variable.

  constructor(
    private auth: AuthService,
    private router: Router,
    private el: ElementRef,
    private ngZone: NgZone
  ) { }

  // ngOnInit is implemented later (initializes slider)




  ngAfterViewInit(): void {
    if (!this.scrollContainerRef) {
      console.error("Critical Error: #scrollContainer not found by @ViewChild.");
    }

    // IntersectionObserver for your animations (keep as you had)
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    const targets = this.el.nativeElement.querySelectorAll('.card, .card-next');
    targets.forEach((t: Element) => observer.observe(t));




  }

  ngAfterViewChecked(): void {
    AOS.refresh();
  }
    services = [
    {
    key: 'TRAIN',
    iconClass: 'fa fa-train'
  },
  {
    key: 'AIR',
    iconClass: 'fa fa-plane'
  },
  {
    key: 'BUS',
    iconClass: 'fa fa-bus'
  },
    
  ];




  // rest of your component (logout, description, temples etc...) unchanged
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  description: { text: string } = {
    text: 'Saint Muktabai ... (your original text)',
  };

  temples = [
    { id: 1, text: 'HOME.TEMPLE_NAME', image: 'assets/images/imagetem1.png' },
    { id: 2, text: 'HOME.TEMPLE_NAME_1', image: 'assets/images/imagetem2.png' },
    { id: 3, text: 'HOME.TEMPLE_NAME_2', image: 'assets/images/imagetem3.png' }
  ];

  // Team members for the slider
  team = [
    { id: 1, nameKey: 'team.member1.name', roleKey: 'team.member1.role', image: 'assets/images/manimage1.png' },
    { id: 2, nameKey: 'team.member2.name', roleKey: 'team.member2.role', image: 'assets/images/manimage2.png' },
    { id: 3, nameKey: 'team.member3.name', roleKey: 'team.member3.role', image: 'assets/images/manimage3.png' },
    { id: 4, nameKey: 'team.member4.name', roleKey: 'team.member4.role', image: 'assets/images/manimage3.png' }

  ];

  // Simple slider state (no external dependency)
  currentSlide = 0;
  slidesPerView = 1;
  private autoplayTimer: any = null;
  autoplayDelay = 5000;

  ngOnInit(): void {
    this.updateSlidesPerView();
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  // responsive breakpoints similar to Swiper
  private updateSlidesPerView() {
    const w = window.innerWidth;
    if (w >= 1024) this.slidesPerView = 3;
    else if (w >= 768) this.slidesPerView = 2;
    else this.slidesPerView = 1;
  }

  @HostListener('window:resize')
  onResize() {
    this.updateSlidesPerView();
  }

  nextSlide() {
    const maxIndex = Math.max(0, this.team.length - this.slidesPerView);

    // Always move forward
    this.currentSlide++;

    // When reaching the end, reset to first slide (loop)
    if (this.currentSlide > maxIndex) {
      this.currentSlide = 0;
    }
  }

  prevSlide() {
    // You can disable this if you don't need backward navigation
    // or keep it looping backward if the user clicks manually
    const maxIndex = Math.max(0, this.team.length - this.slidesPerView);

    this.currentSlide--;

    if (this.currentSlide < 0) {
      this.currentSlide = maxIndex;
    }
  }


  startAutoplay() {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => this.nextSlide(), this.autoplayDelay);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }


  showScrollTop = true;

  // ...
  onDivScroll(event: any): void {
    const element = event.target;
    // Check the specific element's scroll position (e.g., more than 200 pixels)
    this.showScrollTop = element.scrollTop > 200;
  }

  // 2. SCROLL ACTION: Performs the smooth scroll
  scrollToTop(): void {
    const elementToScroll: HTMLElement | undefined = this.scrollContainerRef?.nativeElement;

    if (elementToScroll) {
      // Force scroll using standard DOM API
      elementToScroll.scrollTop = 0; // Immediate scroll, or use scrollTo for smooth
      elementToScroll.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Fallback for debugging
      console.error("Scroll container reference is missing.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  openDialog(type: string) {
    this.isDialogOpen = true;

    switch (type) {
      case 'saint':
        this.dialogTitle = 'संत मुक्ताबाई (मुक्ताई) यांची माहिती';
        this.dialogContent = `संत मुक्ताबाई यांचे नाव मुक्ताई विठ्ठलपंत कुलकर्णी असे होते
मच्छिंद्रनाथ ऊर्फ मत्स्येंद्रनाथ - गोरखनाथ ऊर्फ गोरक्षनाथ - गहिनीनाथ - निवृत्तीनाथ - मुक्ताबाई अशी ही गुरुपरंपरा आहे.
मुक्ताबाई यांचे व्यक्तिमत्त्व जनमानसाने विविध रुपामध्ये जतन केले आहे.`;
        break;
      case 'ashadhi':
        this.dialogTitle = 'आषाढी एकादशी सोहळा';
        this.dialogContent = `वारकरी संप्रदायातील महत्त्व: आषाढी वारी हा वारकरी संप्रदायातील एक महत्त्वाचा भाग आहे, ज्यामध्ये भक्त पंढरपूरला पायी चालत जातात. 
पालखी प्रस्थान: वारीच्या प्रस्थानापूर्वी, संत मुक्ताईंच्या पादुकांचे मंगलाभिषेक आणि पूजा केली जाते.`;
        break;
      case 'abhang':
        this.dialogTitle = 'संत मुक्ताबाईचे अभंग';
        this.dialogContent = 'ताटीचे अभंग: हे त्यांचे सर्वात प्रसिद्ध कार्य आहे, ज्यात त्यांनी ज्ञानेश्वरांना दरवाजा बंद करून बसलेल्या अवस्थेतून बाहेर येण्यासाठी बोध केला आहे.';
        break;
    }
  }

  closeDialog() {
    this.isDialogOpen = false;
  }
}
