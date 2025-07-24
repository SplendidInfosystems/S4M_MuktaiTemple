import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,CommonModule,GoogleMapsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
    zoom = 14;
  center: google.maps.LatLngLiteral = { lat: 21.0465, lng: 76.2221 };
   constructor(private auth: AuthService, private router: Router) {
    
   }

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
    text: 'Saint Muktabai Temple Kothali',
    image: 'assets/images/imagetem1.png'
  },
  {
    id: 2,
    text: 'Saint Muktabai Temple',
    image: 'assets/images/imagetem2.png'
  },
   {
    id: 3,
    text: 'Saint Muktabai Temple Mehun',
    image: 'assets/images/imagetem3.png'
  },

]



}
