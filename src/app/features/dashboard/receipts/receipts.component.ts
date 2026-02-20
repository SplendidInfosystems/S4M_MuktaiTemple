import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize, Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { DonationReceipt } from '../../../core/models/interface-model';
import { DonationService } from '../../../core/services/donation/donation.service';
import { LoaderService } from '../../../core/services/loader/loader.service';
import { ToastService } from '../../../core/services/toast/toast.service';
import { TempleLocationService } from '../../../core/services/temple-state/temple-location.service';

@Component({
  selector: 'app-receipts',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './receipts.component.html',
  styleUrl: './receipts.component.css'
})
export class ReceiptsComponent implements OnInit, OnDestroy {

  receiptData: DonationReceipt | null = null;

  private donationId: number | null = null;
  private locationId!: number;
  private destroy$ = new Subject<void>();

  constructor(
    private donationService: DonationService,
    private loader: LoaderService,
    private toast: ToastService,
    private templeState: TempleLocationService
  ) {
    localStorage.setItem("donation_id", "5")
  }

  // ================= INIT =================
  ngOnInit(): void {
  this.donationId = this.resolveDonationId();

  if (!this.donationId) {
    this.toast.show('Invalid donation ID', 'error');
    return;
  }

  this.templeState.locationId$
    .pipe(takeUntil(this.destroy$))
    .subscribe(locationId => {
      if (!locationId) return;

      console.log('Calling API with:', this.donationId, locationId);

      this.loadReceipt(this.donationId!, locationId);
    });
}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ================= API =================
  loadReceipt(donationId: number, locationId: number): void {
    this.loader.show();

    this.donationService
      .getDonationReceipt(donationId, locationId)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: (res) => {
          if (res?.success && res.receipt) {
            this.receiptData = res.receipt;
            this.toast.show('Receipt loaded successfully', 'success');
          } else {
            this.toast.show('Invalid receipt response', 'error');
          }
        },
        error: (err) => {
          console.error(err);
          this.toast.show('Failed to load receipt', 'error');
        }
      });
  }

  // ================= HELPERS =================
  printReceipt(): void {
    window.print();
  }

 private resolveDonationId(): number | null {
  const raw = localStorage.getItem('donation_id');

  if (!raw) {
    console.warn('No donation_id in localStorage');
    return null;
  }

  const id = parseInt(raw, 10);
  if (isNaN(id) || id <= 0) {
    console.warn('Invalid donation_id:', raw);
    return null;
  }

  return id;
}
}