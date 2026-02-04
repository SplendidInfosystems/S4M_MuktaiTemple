import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Donation {
  name: string;
  amount: number;
  mode: string;
  date: string;
}

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent {
  donations: Donation[] = [
    {
      "name": "Ramesh Patil",
      "amount": 1100,
      "mode": "Cash",
      "date": "15/01/2026"
    },
    {
      "name": "Sunita Deshmukh",
      "amount": 2100,
      "mode": "Online",
      "date": "15/01/2026"
    },
    {
      "name": "Vijay Kulkarni",
      "amount": 500,
      "mode": "Cash",
      "date": "15/01/2026"
    },
    {
      "name": "Priya Jadhav",
      "amount": 5100,
      "mode": "Online",
      "date": "15/01/2026"
    }
  ];
}
