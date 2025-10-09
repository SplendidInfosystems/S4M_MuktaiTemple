import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-temple-images',
  standalone: true,
  imports: [CommonModule,HeaderComponent,RouterModule],
  templateUrl: './temple-images.component.html',
  styleUrl: './temple-images.component.css'
})
export class TempleImagesComponent {
   images = [
    { src: 'assets/images/changdevimage.jpg', title: 'Temple Entrance', desc: 'Beautiful main temple gate' },
    // { src: 'assets/images/imagecard2.png', title: 'Festival Lights', desc: 'Evening lighting during celebration' },
    // { src: 'assets/images/imagetem1.png', title: 'Devotees Gathering', desc: 'Warkaris performing abhang' },
    { src: 'assets/images/imagetem2.png', title: 'Morning Darshan', desc: 'Temple in golden sunrise' },
    { src: 'assets/images/imagetem3.png', title: 'Main Idol', desc: 'Sacred idol of Sant Muktabai' },
    { src: 'assets/images/Changdev3.jpeg', title: 'Temple Festival', desc: 'Celebration with devotional songs' },
    { src: 'assets/images/changdevimage2.jpg', title: 'Evening Aarti', desc: 'Devotees during Sandhya Aarti' },
    { src: 'assets/images/muktaitemple.jpg', title: 'Traditional Dance', desc: 'Lezim and bhajan performances' },
    { src: 'assets/images/muktaitemplemehun.jpg', title: 'Food Distribution', desc: 'Community prasad seva' },
    { src: 'assets/images/temple6.webp', title: 'Temple Decorations', desc: 'Flowers and rangoli art' },
    { src: 'assets/images/temple9.webp', title: 'Muktai Mandir Inside', desc: 'Sacred sanctum' },
    { src: 'assets/images/temple8.webp', title: 'Pilgrimage Group', desc: 'Warkaris traveling together' },
    { src: 'assets/images/temple11.webp', title: 'Village View', desc: 'Muktainagar from a distance' },
    { src: 'assets/images/temple7.jpg', title: 'Riverbank', desc: 'Peaceful river beside the temple' },
  ];

}
