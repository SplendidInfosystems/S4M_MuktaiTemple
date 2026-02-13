import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DonationReceipt, DonorInfo } from '../../../core/models/interface-model';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CommonModule } from '@angular/common';
import { DonationService } from '../../../core/services/donation/donation.service';
import { LoaderService } from '../../../core/services/loader/loader.service';
import { ToastService } from '../../../core/services/toast/toast.service';
import { finalize } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-receipts',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './receipts.component.html',
  styleUrl: './receipts.component.css'
})
export class ReceiptsComponent  implements OnInit {

  receiptData: DonationReceipt | null = null;
    donation_id: number | null = null;


  constructor(
    private donationService: DonationService,
    private loader: LoaderService,
    private toast: ToastService
  ) {
     this.donation_id = this.resolveAdminId();
    if (this.donation_id === null) {
      this.toast.show('Donation ID not found. Please login again.', 'error');
      return;
    }

    this.loadReceipt(this.donation_id);
  }
  ngOnInit(): void {
  }

   loadReceipt(id: number): void {
    this.loader.show();

    this.donationService.getDonationReceipt(id)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: (res) => {

          if (res.success) {
            this.receiptData = res.receipt;
            this.toast.show('Receipt loaded successfully', 'success');
          } else {
            this.toast.show('Invalid receipt response', 'error');
          }

        },
        error: () => {
          this.toast.show('Failed to load receipt', 'error');
        }
      });
  }

  printReceipt(): void {
    window.print();
  }

   private resolveAdminId(): number | null {
    const id = Number(localStorage.getItem('donation_id'));
    if (Number.isFinite(id) && id > 0) {
      return id;
    }

    return 5;
  }

}
