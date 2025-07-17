import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  showPassword = false;

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/)
      ]]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  allowOnlyDigits(event: KeyboardEvent) {
    const charCode = event.key;
    if (!/^\d$/.test(charCode)) {
      event.preventDefault();
    }
  }

  onInput(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    if (!/^[0-9]$/.test(value)) {
      input.value = '';
      return;
    }

    const nextInput = document.getElementById(`input-${index + 1}`);
    if (nextInput && value) {
      (nextInput as HTMLInputElement).focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      if (!input.value) {
        const prevInput = document.getElementById(`input-${index - 1}`);
        if (prevInput) {
          (prevInput as HTMLInputElement).focus();
        }
      } else {
        input.value = '';
      }
    }

    if (event.key.length === 1 && !/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  onSubmit() {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;

    // ✅ Admin credentials
    if (email === 'admin@gmail.com' && password === 'Admin@123') {
      localStorage.setItem('token', 'admin_token');
      this.router.navigate(['/dashboard']); // ✅ Admin goes to dashboard
    }
    // ✅ Any other valid user
    else if (email === 'user@gmail.com' && password === 'User@123') {
      localStorage.setItem('token', 'user_token');
      this.router.navigate(['/home']); // ✅ Normal user goes to home
    }
    // ❌ Invalid credentials
    else {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Invalid credentials';
    }
  } else {
    this.loginForm.markAllAsTouched();
  }
  }

    get password(): string {
    return this.loginForm.get('password')?.value || '';
  }

  hasUpperCase(): boolean {
    return /[A-Z]/.test(this.password);
  }

  hasLowerCase(): boolean {
    return /[a-z]/.test(this.password);
  }

  hasNumber(): boolean {
    return /[0-9]/.test(this.password);
  }

  hasSpecialChar(): boolean {
    return /[\W_]/.test(this.password);
  }

  hasMinLength(): boolean {
    return this.password.length >= 6;
  }


}
