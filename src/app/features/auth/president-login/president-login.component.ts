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
      showPassword = false;


  
  
  
    
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
    this.toast.show('Please enter valid details', 'error');
    return;
  }

  const payload = this.loginForm.value;

  this.donationService.PostPresidentLogin(payload).subscribe({
    next: (res: any) => {
      console.log('President Login response:', res);

      if (res.success) {

        const president = res.data;

        // 🔥 Safety check (VERY IMPORTANT)
        if (!president || !president.president_id || !president.location_id) {
          console.error('Invalid President API response:', res);
          
          // If backend not sending IDs, just login normally
          localStorage.setItem('token', 'loggedin');
          localStorage.setItem('role', 'president');

          this.toast.show('President Login successfully', 'success');
          this.router.navigate(['/dashboard/president-Dashboard']);
          return;
        }

        // ✅ Store IDs if available
        localStorage.setItem('token', 'loggedin');
        localStorage.setItem('role', 'president');
        localStorage.setItem('president_id', String(president.president_id));
        localStorage.setItem('location_id', String(president.location_id));

        this.toast.show('President Login successfully', 'success');
        this.router.navigate(['/dashboard/president-Dashboard']);

      } else {
        this.toast.show(res.message || 'Invalid credentials', 'error');
      }
    },
    error: (err) => {
      console.error(err);
      this.toast.show('Login failed. Please try again.', 'error');
    }
  });
}




 togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  
    goBack() {
      this.router.navigate(['/login']);
    }
    get f() {
    return this.loginForm.controls;
  }
  
    // Password checks
  get password(): string {
    return this.loginForm.get('password')?.value || '';
  }
  hasUpperCase(): boolean { return /[A-Z]/.test(this.password); }
  hasLowerCase(): boolean { return /[a-z]/.test(this.password); }
  hasNumber(): boolean { return /[0-9]/.test(this.password); }
  hasSpecialChar(): boolean { return /[\W_]/.test(this.password); }
  hasMinLength(): boolean { return this.password.length >= 6; }
}

 

