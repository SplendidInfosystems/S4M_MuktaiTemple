import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DonationService } from '../../../core/services/donation/donation.service';
import { ToastService } from '../../../core/services/toast/toast.service';

@Component({
  selector: 'app-president-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './president-login.component.html',
  styleUrl: './president-login.component.css'
})
export class PresidentLoginComponent {
   loginForm: FormGroup;
    submitted = false;

  
  
  
    
    constructor(private fb: FormBuilder,
       private router: Router,
       private donationService: DonationService,
           private toast: ToastService,
       
       

    ) {
      this.loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
      localStorage.setItem('role', 'president'); // or 'admin'
    }
  
  onSubmit() {
  this.submitted = true;

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  const payload = this.loginForm.value;

  this.donationService.PostPresidentLogin(payload).subscribe({
    next: (res: any) => {
      console.log('Login response:', res);

      if (res.success) {
        const president = res.data;

        this.toast.show('President Login successfully', 'success');

        localStorage.setItem('token', 'loggedin');
        localStorage.setItem('role', 'president');
        localStorage.setItem('president_id', president.president_id.toString());

        this.router.navigate(['/dashboard/president-Dashboard']);
      } 
      else {
        this.toast.show(res.message || 'Invalid credentials', 'error');
      }
    },
    error: (err) => {
      console.error(err);
      this.toast.show('Server error. Please try again.', 'error');
    }
  });
}

  
    goBack() {
      this.router.navigate(['/login']);
    }
    get f() {
    return this.loginForm.controls;
  }

}
