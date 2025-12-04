import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AddExpencesService } from '../../services/add-expences.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expences',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './add-expences.component.html',
  styleUrls: ['./add-expences.component.css']
})
export class AddExpencesComponent implements OnInit {
  expenseForm!: FormGroup;
  convertedAmountInWords: string = '';
  @Output() expenseAdded = new EventEmitter<unknown>();

  constructor(private expenseService: AddExpencesService , private router :Router) { }

  ngOnInit(): void {
    // Initialize form controls
    this.expenseForm = new FormGroup({
      expenseName: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      otherCategory: new FormControl(''),
      status: new FormControl('', Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(1)]),
      description: new FormControl('', Validators.required),
    });

    // Subscribe to conditional validation for 'otherCategory'
    this.subscribeToCategoryChanges();

    // Subscribe to amount changes to convert to words
    this.subscribeToAmountChanges();
  }

  subscribeToCategoryChanges(): void {
    const categoryControl = this.expenseForm.get('category');
    const otherCategoryControl = this.expenseForm.get('otherCategory');

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

  subscribeToAmountChanges(): void {
    this.expenseForm.get('amount')?.valueChanges.subscribe(value => {
      const amount = Number(value);
      if (!isNaN(amount) && amount > 0) {
        this.convertedAmountInWords = this.convertNumberToWords(amount) + ' Rupees Only';
      } else {
        this.convertedAmountInWords = '';
      }
    });
  }

 onSubmit(): void {
  if (this.expenseForm.valid) {
    this.expenseService.addExpense(this.expenseForm.value);
    alert('Expense request submitted successfully!');
    this.expenseForm.reset();
  } else {
    this.expenseForm.markAllAsTouched();
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
