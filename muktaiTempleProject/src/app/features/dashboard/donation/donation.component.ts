import { Component } from '@angular/core';
import { Router,  } from '@angular/router';

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent {
  constructor(private router:Router){}
  openAddDonorModal(){
    this.router.navigate(['/dashboard/add-donor']);
  }

}
