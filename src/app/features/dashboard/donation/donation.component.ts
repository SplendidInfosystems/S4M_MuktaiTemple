import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DonationService } from '../../../core/services/donation/donation.service';
import { DonorInfo } from '../../../core/models/interface-model';


@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [CommonModule, RouterLink,TranslateModule,DatePipe],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent {
  
  selectedDonation: any;
  donors: DonorInfo[] = [];
    loading = false;
  errorMsg = '';

  constructor( private donationService: DonationService) {
    this.loadDonors();
  }

  loadDonors() {
    this.loading = true;

    this.donationService.getDonorInfo().subscribe({
      next: (res) => {
      this.donors = res.data;   
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'Failed to load donor info';
        console.error(err);
        this.loading = false;
      }
    });
  }
generatePDF(donation: DonorInfo) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Temple Donation Receipt', 14, 15);

  autoTable(doc, {
    startY: 25,
    head: [['Field', 'Value']],
    body: [
      ['Donor Name', donation.name],
      ['Date', new Date(donation.donation_date).toLocaleDateString()],
      ['Amount', `₹${donation.amount}`],
      ['Payment Mode', donation.payment_method]
    ]
  });

  doc.autoPrint();
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, '_blank');
}

}

