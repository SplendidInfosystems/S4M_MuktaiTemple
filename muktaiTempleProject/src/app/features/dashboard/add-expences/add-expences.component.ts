import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-expences',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,TranslateModule],
  templateUrl: './add-expences.component.html',
  styleUrls: ['./add-expences.component.css']
})
export class AddExpencesComponent {
  expenseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      expenseName: ['', Validators.required],
      date: ['', Validators.required],
      category: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      state: ['', Validators.required]
    });
  }
    onSubmit() {
    if (this.expenseForm.valid) {
      console.log(this.expenseForm.value);
      // handle form submit
    } else {
      this.expenseForm.markAllAsTouched();
    }
  }
}
