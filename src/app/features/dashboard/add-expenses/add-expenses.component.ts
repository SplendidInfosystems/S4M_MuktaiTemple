import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AddExpenseRequest } from '../../../core/models/interface-model';
import { ToastService } from '../../../core/services/toast/toast.service';
import { Router } from '@angular/router';
import { DonationService } from '../../../core/services/donation/donation.service';

@Component({
  selector: 'app-add-expenses',
  standalone: true,
  imports: [TranslateModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-expenses.component.html',
  styleUrl: './add-expenses.component.css'
})
export class AddExpensesComponent implements OnInit {
    expenseForm!: FormGroup;

    convertedAmountInWords: string = '';
      isSubmitting = false;


  constructor(
    private expenseService: DonationService,
   private toast: ToastService,
    private router: Router
  ) {}


     ngOnInit(): void {
    // Initialize form controls
     this.expenseForm = new FormGroup({
    category: new FormControl('', Validators.required),
    expense_date: new FormControl('', Validators.required),
    amount: new FormControl(null, [Validators.required, Validators.min(1)]),
    description: new FormControl('', Validators.required),
  });
     // Subscribe to conditional validation for 'otherCategory'
    this.subscribeToCategoryChanges();

    // Subscribe to amount changes to convert to words
    this.subscribeToAmountChanges();
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

onSubmit(): void {

  if (this.expenseForm.invalid) {
    this.expenseForm.markAllAsTouched();
    return;
  }

  this.isSubmitting = true;

const selectedDate = this.expenseForm.get('expense_date')?.value;

  const payload: AddExpenseRequest = {
  category: this.expenseForm.get('category')?.value,
  description: this.expenseForm.get('description')?.value,
  amount: Number(this.expenseForm.get('amount')?.value),
  expense_date: selectedDate
    ? `${selectedDate} 00:00:00`
    : '',
  admin_id: Number(localStorage.getItem('admin_id'))
};


 this.expenseService.PostAddExpense(payload).subscribe({
  next: (res: any) => {
    console.log('Expense API Response:', res);
    this.isSubmitting = false;

    if (res?.success === true) {
      this.toast.show(
        res?.message || 'Expense added successfully',
        'success'
      );

      this.router.navigate(['/dashboard/expenses']);
      this.onCancel();
    } else {
      this.toast.show(
        res?.message || 'Failed to add expense',
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


 onCancel(): void {
    this.expenseForm.reset();
    this.convertedAmountInWords = '';
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

