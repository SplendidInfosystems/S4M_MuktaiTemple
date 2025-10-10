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
    { src: 'assets/images/changdevimage.jpg', title: 'Changdev Temple Entrance', desc: 'Historic temple of Saint Changdev Maharaj' },
    { src: 'assets/images/muktaiimage2.jpg', title: 'Muktabai Temple', desc: 'Beautiful temple in golden sunrise' },
    { src: 'assets/images/image11.jpg', title: 'Main Idol', desc: 'Sacred idol of Sant Muktabai' },
    { src: 'assets/images/Changdev3.jpeg', title: 'Changdev Festival', desc: 'Devotional celebration & rituals' },
    { src: 'assets/images/changdevimage2.jpg', title: 'Changdev Temple View', desc: 'Magnificent temple structure' },
    { src: 'assets/images/muktaitemple.jpg', title: 'Traditional Dance', desc: 'Lezim and bhajan performances' },
    { src: 'assets/images/muktaitemplemehun.jpg', title: 'Food Distribution', desc: 'Community prasad seva for devotees' },
    { src: 'assets/images/temple6.webp', title: 'Muktabai Riverside Temple', desc: 'Flowers and rangoli decorations' },
    { src: 'assets/images/temple9.webp', title: 'Muktai Mandir Inside', desc: 'Peaceful and sacred sanctum' },
    { src: 'assets/images/temple8.webp', title: 'Pilgrimage Group', desc: 'Warkaris traveling together joyfully' },
    { src: 'assets/images/temple11.webp', title: 'Village View', desc: 'Panoramic view of Muktainagar' },
    { src: 'assets/images/temple7.jpg', title: 'Riverbank', desc: 'Tranquil river beside the temple' },

  ];

}
