import { AfterViewChecked, AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { TranslateModule } from '@ngx-translate/core';
import AOS from 'aos';
import SwiperCore from 'swiper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,CommonModule,GoogleMapsModule,TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})

export class HomeComponent implements OnInit, AfterViewChecked, AfterViewInit  {

  ngOnInit(): void {}
constructor(private auth: AuthService, private router: Router,private el: ElementRef) {
    
   }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  // observe both card and card-next
  const targets = this.el.nativeElement.querySelectorAll('.card, .card-next');
  targets.forEach((t: Element) => observer.observe(t));



  
    
  }

  ngAfterViewChecked(): void {
    AOS.refresh(); // ensures animations trigger after Angular renders DOM
  }
  
    zoom = 14;
  center: google.maps.LatLngLiteral = { lat: 21.0465, lng: 76.2221 };
   

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
description: { text: string } = {
  text: 'Saint Muktabai, also known as Muktai, was a revered 13th-century saint in the Varkari tradition and the younger sister of Saint Dnyaneshwar. She is celebrated for her deep spiritual insight and poetic contributions, which continue to inspire followers of the Bhakti movement. One of the prominent temples dedicated to her is located in Mehun, near Muktainagar in the Jalgaon district of Maharashtra',
};


temples: {id: number; text: string; image: string }[] = [
  {
    id: 1,
    text: 'HOME.TEMPLE_NAME',
    image: 'assets/images/imagetem1.png'
  },
  {
    id: 2,
    text: 'HOME.TEMPLE_NAME_1',
    image: 'assets/images/imagetem2.png'
  },
   {
    id: 3,
    text: 'HOME.TEMPLE_NAME_2',
    image: 'assets/images/imagetem3.png'
  },

]



}
