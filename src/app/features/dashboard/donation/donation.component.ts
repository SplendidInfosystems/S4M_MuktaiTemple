import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { finalize } from 'rxjs';

import { DonationService } from '../../../core/services/donation/donation.service';
import { DonorInfo } from '../../../core/models/interface-model';
import { ToastService } from '../../../core/services/toast/toast.service';
import { LoaderService } from '../../../core/services/loader/loader.service';
import { environment } from '../../../../environments/environment';
import { TempleLocationService } from '../../../core/services/temple-state/temple-location.service';

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, DatePipe],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent implements OnInit {

  donors: DonorInfo[] = [];

  // =========================
  // PAGINATION VARIABLES
  // =========================
  currentPage: number = 1;
  pageSize: number = 5; // records per page

  constructor(
    private donationService: DonationService,
    private toast: ToastService,
    private loader: LoaderService,
    private router: Router,
      private templeState: TempleLocationService

  ) {
    // this.loadDonors();
  }

  ngOnInit() {

      this.loadDonors();
  
}

  // =========================
  // LOAD DONORS
  // =========================
  loadDonors() {
    this.loader.show();

    this.donationService.getDonorInfo()
      .pipe(
        finalize(() => this.loader.hide())
      )
      .subscribe({
        next: (res: any) => {
          this.donors = res?.data || [];
          this.toast.show('Donor list loaded successfully', 'success');

          // Reset to first page after reload
          this.currentPage = 1;
        },
        error: (err) => {
          this.toast.show('Failed to load donor info', 'error');

          if (!environment.production) {
            console.error(err);
          }
        }
      });
  }

  // =========================
  // PAGINATION LOGIC
  // =========================

  get totalPages(): number {
    return Math.ceil(this.donors.length / this.pageSize) || 1;
  }

  get paginatedDonors(): DonorInfo[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.donors.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // =========================
  // GENERATE PDF RECEIPT
  // =========================
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

    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  }

}
