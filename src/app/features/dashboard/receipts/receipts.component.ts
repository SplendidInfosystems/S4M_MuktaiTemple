import { Component, OnInit } from '@angular/core';
import { ReceiptService } from '../../../core/services/receipt.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DonorInfo } from '../../../core/models/interface-model';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receipts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receipts.component.html',
  styleUrl: './receipts.component.css'
})
export class ReceiptsComponent implements OnInit {

  

  pdfUrl: SafeResourceUrl | null = null;

  constructor(
    private receiptService: ReceiptService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const donor = this.receiptService.getDonor();

    if (donor) {
      this.generatePDF(donor);
    }
  }

  generatePDF(donation: DonorInfo) {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Temple Donation Receipt', 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [['Field', 'Value']],
      body: [
        ['Receipt No', donation.donor_id],
        ['Donor Name', donation.name],
        ['Mobile', donation.mobile_number],
        ['Date', new Date(donation.donation_date).toLocaleDateString()],
        ['Amount', `₹${donation.amount}`],
        ['Payment Mode', donation.payment_method]
      ]
    });

    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);

    this.pdfUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(url + '#toolbar=0');
  }
}
