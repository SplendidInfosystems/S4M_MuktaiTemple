import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DonationService } from '../../../core/services/donation/donation.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string | null = null;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private donationService: DonationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // ================= LOGIN =================
  onSubmit() {
    this.submitted = true;
    this.errorMessage = null;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Please enter valid details';
      return;
    }

    const payload = this.loginForm.value;

    this.donationService.PostAdminLogin(payload).subscribe({
      next: (res: any) => {
        console.log('Login response:', res);

        if (res.success) {
          const admin = res.data;

          // Save data
          localStorage.setItem('token', 'loggedin');
          localStorage.setItem('role', 'admin');
          localStorage.setItem('admin_id', admin.admin_id.toString());
          localStorage.setItem('location_id', admin.location_id.toString());

          // Redirect
          this.router.navigate(['/dashboard/admin-Dashboard']);
        } else {
          this.errorMessage = res.message || 'Invalid credentials';
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Login failed. Please try again.';
      }
    });
  }

  goBack() {
    this.router.navigate(['/login']);
  }

  get f() {
    return this.loginForm.controls;
  }
    togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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



