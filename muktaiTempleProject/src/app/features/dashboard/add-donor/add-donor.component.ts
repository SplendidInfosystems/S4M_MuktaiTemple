import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-donor',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,TranslateModule],
  templateUrl: './add-donor.component.html',
  styleUrl: './add-donor.component.css'
})
export class AddDonorComponent implements OnInit {
    donorForm: FormGroup;
    convertedAmountInWords: string = '';


  constructor(private fb: FormBuilder) {
    this.donorForm = this.fb.group({
      donorName: ['', Validators.required],
      date: ['', Validators.required],
      address: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      amount: ['', [Validators.required, Validators.min(1)]],
      paymentMethod: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.donorForm.valid) {
      
     const donorData = this.donorForm.value;
      // console.log('Donor Data:', donorData);
    } else {
      this.donorForm.markAllAsTouched();
    }
  }
  ngOnInit() {
     this.donorForm.get('amount')?.valueChanges.subscribe(value => {
    const amount = Number(value);
    if (!isNaN(amount) && amount > 0) {
      this.convertedAmountInWords = this.convertNumberToWords(amount) + ' Rupees Only';
    } else {
      this.convertedAmountInWords = '';
    }
  });
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
