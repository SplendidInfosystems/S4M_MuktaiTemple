import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DonationService } from '../../../core/services/donation/donation.service';
import { ToastService } from '../../../core/services/toast/toast.service';
import { AddDonationRequest } from '../../../core/models/interface-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-donation',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-donation.component.html',
  styleUrl: './add-donation.component.css'
})
export class AddDonationComponent implements OnInit {

  donationForm!: FormGroup;
  convertedAmountInWords: string = '';
  isSubmitting = false;

  constructor(
    private donationService: DonationService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.donationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      mode: new FormControl('', Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(1)]),
      address: new FormControl('', Validators.required),
      mobile_number: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ])
    });

    this.subscribeToAmountChanges();
  }

  // ================= Amount in Words =================
  subscribeToAmountChanges(): void {
    this.donationForm.get('amount')?.valueChanges.subscribe(value => {
      const amount = Number(value);
      if (!isNaN(amount) && amount > 0) {
        this.convertedAmountInWords =
          this.convertNumberToWords(amount) + ' Rupees Only';
      } else {
        this.convertedAmountInWords = '';
      }
    });
  }

  // ================= Submit =================
  onSubmit(): void {

    if (this.donationForm.invalid) {
      this.donationForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const selectedDate = this.donationForm.get('date')?.value;

    const payload: AddDonationRequest = {
      name: this.donationForm.get('name')?.value,
      amount: Number(this.donationForm.get('amount')?.value),
      payment_method: this.donationForm.get('mode')?.value,
      address: this.donationForm.get('address')?.value,
      mobile_number: this.donationForm.get('mobile_number')?.value,

      //  correct datetime format
      donation_date: selectedDate
        ? `${selectedDate} 00:00:00`
        : '',

      amount_in_words: this.convertedAmountInWords,

      location_id: Number(localStorage.getItem('location_id')),
      admin_id: Number(localStorage.getItem('admin_id')),
 president_id: Number(localStorage.getItem('president_id')) || 1,
      // string transaction id (IMPORTANT FIX)
      transaction_id: `CASH-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(Math.random()*100)}`
    };

    this.donationService.PostAddDonation(payload).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;

        // ✅ Correct success check
        if (res?.statusCode === 200) {
          this.toast.show(
            res.body?.message || 'Donation added successfully',
            'success'
          );
            this.router.navigate(['/dashboard/donation']); 

          this.onCancel();
        } else {
          this.toast.show(
            res?.body?.message || 'Failed to add donation',
            'error'
          );
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error(err);
        this.toast.show('API Error', 'error');
      }
    });
  }

  // ================= Cancel =================
  onCancel(): void {
    this.donationForm.reset();
    this.convertedAmountInWords = '';
  }

  // ================= Number to Words =================
  convertNumberToWords(amount: number): string {

    const ones = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six',
      'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve',
      'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
      'Seventeen', 'Eighteen', 'Nineteen'
    ];

    const tens = [
      '', '', 'Twenty', 'Thirty', 'Forty',
      'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];

    if (amount === 0) return 'Zero';

    const numToWords = (n: number): string => {
      if (n < 20) return ones[n];
      if (n < 100)
        return tens[Math.floor(n / 10)] +
          (n % 10 ? ' ' + ones[n % 10] : '');
      if (n < 1000)
        return ones[Math.floor(n / 100)] +
          ' Hundred' +
          (n % 100 ? ' and ' + numToWords(n % 100) : '');
      return '';
    };

    let words = '';
    const crore = Math.floor(amount / 10000000);
    const lakh = Math.floor((amount % 10000000) / 100000);
    const thousand = Math.floor((amount % 100000) / 1000);
    const hundred = Math.floor((amount % 1000) / 100);
    const rest = amount % 100;

    if (crore) words += numToWords(crore) + ' Crore ';
    if (lakh) words += numToWords(lakh) + ' Lakh ';
    if (thousand) words += numToWords(thousand) + ' Thousand ';
    if (hundred) words += numToWords(hundred) + ' Hundred ';
    if (rest)
      words += (words !== '' ? 'and ' : '') + numToWords(rest);

    return words.trim();
  }
}
