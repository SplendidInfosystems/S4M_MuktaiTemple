import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface Donation {
  date: string;
  donorName: string;
  address: string;
  mobileNo: string;
  amount: string;
  paymentMethod: string;
  amountInWords: string;
}

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

  userRole: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    this.userRole = role ? role.toLowerCase() : '';
  }

  openAddDonorModal() {
    this.router.navigate(['/dashboard/add-donor']);
  }

  donationData: Donation[] = [
    {
      date: '01.01.25',
      donorName: 'Kiran Patil',
      address: 'Muktainagar',
      mobileNo: '9112345667',
      amount: '500',
      paymentMethod: 'Offline',
      amountInWords: 'Five Hundred'
    },
    {
      date: '01.02.25',
      donorName: 'Kiran Nagare',
      address: 'Muktainagar',
      mobileNo: '9612564667',
      amount: '1000',
      paymentMethod: 'Offline',
      amountInWords: 'One Thousand'
    },
    {
      date: '10.03.25',
      donorName: 'Akshay Kale',
      address: 'Nagar',
      mobileNo: '9565452567',
      amount: '2000',
      paymentMethod: 'Online',
      amountInWords: 'Two Thousand'
    },
    {
      date: '15.06.25',
      donorName: 'Shubham Sandbhor',
      address: 'Muktainagar',
      mobileNo: '9875985654',
      amount: '2500',
      paymentMethod: 'Offline',
      amountInWords: 'Two Thousand Five Hundred'
    },
    {
      date: '20.06.25',
      donorName: 'Balaji Gadade',
      address: 'Muktainagar',
      mobileNo: '8852654525',
      amount: '500',
      paymentMethod: 'Online',
      amountInWords: 'Five Hundred'
    }
  ];

  generatePDF(donation: Donation) {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Temple Donation Report', 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [['Field', 'Value']],
      body: [
        ['Donor Name', donation.donorName],
        ['Date', donation.date],
        ['Amount', donation.amount + ' Rs'],
        ['Address', donation.address],
        ['Mobile No', donation.mobileNo],
        ['Payment Method', donation.paymentMethod],
        ['Amount in Words', donation.amountInWords]
      ]
    });

    // Create Blob
    const pdfBlob = doc.output('blob');

    // Create File with proper name
    const file = new File(
      [pdfBlob],
      `${donation.donorName.replace(/\s+/g, '_')}_${donation.date}.pdf`,
      { type: "application/pdf" }
    );

    // Open new tab
    const pdfUrl = URL.createObjectURL(file);
    window.open(pdfUrl, '_blank');
  }
}
