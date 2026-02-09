import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-donation',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule,CommonModule],
  templateUrl: './add-donation.component.html',
  styleUrl: './add-donation.component.css'
})
export class AddDonationComponent implements OnInit {
  donationForm!:FormGroup;
  convertedAmountInWords:string = '';


   ngOnInit(): void {
    // Initialize form controls
    this.donationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      mode: new FormControl('', Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(1)]),
     
    });
         // Subscribe to conditional validation for 'otherCategory'
    this.subscribeToCategoryChanges();

    // Subscribe to amount changes to convert to words
    this.subscribeToAmountChanges();

  }


    subscribeToAmountChanges(): void {
    this.donationForm.get('amount')?.valueChanges.subscribe(value => {
      const amount = Number(value);
      if (!isNaN(amount) && amount > 0) {
        this.convertedAmountInWords = this.convertNumberToWords(amount) + ' Rupees Only';
      } else {
        this.convertedAmountInWords = '';
      }
    });
  }
subscribeToCategoryChanges(): void {
    const categoryControl = this.donationForm.get('category');
    const otherCategoryControl = this.donationForm.get('otherCategory');

    if (categoryControl && otherCategoryControl) {
      categoryControl.valueChanges.subscribe(category => {
        if (category === 'Others') {
          otherCategoryControl.setValidators(Validators.required);
        } else {
          otherCategoryControl.clearValidators();
          otherCategoryControl.reset();
        }
        otherCategoryControl.updateValueAndValidity();
      });
    }
  }

 

 onSubmit(): void {
  if (this.donationForm.valid) {
    alert('Donation request submitted successfully!');
    this.donationForm.reset();
  } else {
    this.donationForm.markAllAsTouched();
  }
}


  convertNumberToWords(amount: number): string {
    const ones = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
      'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
      'Seventeen', 'Eighteen', 'Nineteen'
    ];

    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (amount === 0) {return 'Zero';}

    const numToWords = (n: number): string => {
      if (n < 20) {return ones[n];}
      if (n < 100) {return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');}
      if (n < 1000) {return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' and ' + numToWords(n % 100) : '');}
      return '';
    };

    let words = '';
    const crore = Math.floor(amount / 10000000);
    const lakh = Math.floor((amount % 10000000) / 100000);
    const thousand = Math.floor((amount % 100000) / 1000);
    const hundred = Math.floor((amount % 1000) / 100);
    const rest = amount % 100;

    if (crore) {words += numToWords(crore) + ' Crore ';}
    if (lakh) {words += numToWords(lakh) + ' Lakh ';}
    if (thousand) {words += numToWords(thousand) + ' Thousand ';}
    if (hundred) {words += numToWords(hundred) + ' Hundred ';}
    if (rest) {words += (words !== '' ? 'and ' : '') + numToWords(rest);}

    return words.trim();
  }
}
