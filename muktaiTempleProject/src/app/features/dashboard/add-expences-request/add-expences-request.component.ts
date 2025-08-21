import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-expences-request',
  standalone: true,
  imports: [TranslateModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-expences-request.component.html',
  styleUrl: './add-expences-request.component.css'
})
export class AddExpencesRequestComponent {
    expenseRequestForm: FormGroup;
  convertedAmountInWords: string = '';

  constructor(private fb: FormBuilder) {
    this.expenseRequestForm = this.fb.group({
      requester: ['', Validators.required],
      category: ['', Validators.required],
      otherCategory: [''],
      amount: ['', [Validators.required, Validators.min(1)]],
      notes: ['']
    });

    // Convert amount to words dynamically
    this.expenseRequestForm.get('amount')?.valueChanges.subscribe(val => {
      this.convertedAmountInWords = this.convertNumberToWords(val);
    });
  }

  onSubmit() {
    if (this.expenseRequestForm.valid) {
      console.log('Expense Request Submitted:', this.expenseRequestForm.value);
      alert('Expense request submitted successfully!');
      this.expenseRequestForm.reset();
    }
  }

  closeForm() {
    console.log('Form closed');
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
