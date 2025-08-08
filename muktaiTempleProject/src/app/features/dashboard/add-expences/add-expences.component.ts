import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-expences',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,TranslateModule],
  templateUrl: './add-expences.component.html',
  styleUrls: ['./add-expences.component.css']
})
export class AddExpencesComponent  implements OnInit {
  expenseForm: FormGroup;
    convertedAmountInWords: string = '';


  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      expenseName: ['', Validators.required],
      date: ['', Validators.required],
      category: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      status: ['', Validators.required],
      otherCategory: [''] // optional input for 'Others'

    });
  }
    onSubmit() {
    if (this.expenseForm.valid) {
       this.expenseForm.get('category')?.valueChanges.subscribe(value => {
    if (value !== 'Others') {
      this.expenseForm.get('otherCategory')?.reset();
    }
  });
      console.log(this.expenseForm.value);
      // handle form submit
    } else {
      this.expenseForm.markAllAsTouched();
    }
  }
  ngOnInit() {
    this.expenseForm.get('amount')?.valueChanges.subscribe(value => {
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

  if (amount === 0) return 'Zero';

  const numToWords = (n: number): string => {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
    if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' and ' + numToWords(n % 100) : '');
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
  if (rest) words += (words !== '' ? 'and ' : '') + numToWords(rest);

  return words.trim();
}
}
