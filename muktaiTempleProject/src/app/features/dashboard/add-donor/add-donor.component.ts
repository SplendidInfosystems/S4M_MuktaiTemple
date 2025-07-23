import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-donor',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-donor.component.html',
  styleUrl: './add-donor.component.css'
})
export class AddDonorComponent {
    donorForm: FormGroup;

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
      console.log(this.donorForm.value);
      // handle form submit
    } else {
      this.donorForm.markAllAsTouched();
    }
  }
   
}
