import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router,  } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent {
  constructor(private router:Router){}
  openAddDonorModal(){
    this.router.navigate(['/dashboard/add-donor']);
  }


  donationData= [
    {
      date: '01.01.25',
      donorName: 'Kiran Patil',
      address: 'Muktainagar',
      mobileNo: '9112345667',
      amount: '500 Rs',
      paymentMethod: 'Offline',
      amountInWords: 'Five Hundred'
    },
       {
      date: '01.02.25',
      donorName: 'Kiran Nagare',
      address: 'Muktainagar',
      mobileNo: '9612564667',
      amount: '1000 Rs',
      paymentMethod: 'Offline',
      amountInWords: 'One Thousand'
    },
       {
      date: '10.03.25',
      donorName: 'Akshay Kale',
      address: 'Nagar',
      mobileNo: '9565452567',
      amount: '2000 Rs',
      paymentMethod: 'online',
      amountInWords: 'Two Thousand'
    },
       {
      date: '15.06.25',
      donorName: 'Shubham Sandbhor',
      address: 'Muktainagar',
      mobileNo: '9875985654',
      amount: '2500 Rs',
      paymentMethod: 'Offline',
      amountInWords: 'Two Thousand Five Hundred'
    },
       {
      date: '20.06.25',
      donorName: 'Balaji Gadade',
      address: 'Muktainagar',
      mobileNo: '8852654525',
      amount: '500 Rs',
      paymentMethod: 'Online',
      amountInWords: 'Five Hundred'
    },

  ]

}
