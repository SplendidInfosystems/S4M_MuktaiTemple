import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  showPassword = false;

  selectedTemple: string = '';   // temple selection
selectedRole: 'owner' | 'admin' | null = 'owner';

  temples: string[] = [' Muktainagar', ' Kothali', ' Pandharpur '];

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
  temple: ['', Validators.required],
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

  onSubmit() {
  const temple = this.loginForm.value.temple?.trim();
  const email = this.loginForm.value.email?.trim();
  const password = this.loginForm.value.password?.trim();

  if (!temple) {
    this.errorMessage = 'Please select a temple first';
    return;
  }

  if (!this.selectedRole) {
    this.errorMessage = 'Please select login type (Owner/Admin)';
    return;
  }

  if (this.loginForm.valid) {
    if (this.selectedRole === 'owner') {
      if (email === 'owner@gmail.com' && password === 'Owner@123') {
        localStorage.setItem('role', 'owner');
        localStorage.setItem('temple', temple);
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid Owner credentials';
      }
    }

    if (this.selectedRole === 'admin') {
      if (email === 'admin@gmail.com' && password === 'Admin@123') {
        localStorage.setItem('role', 'admin');
        localStorage.setItem('temple', temple);
        this.router.navigate(['/dashboard/donation']);
      } else {
        this.errorMessage = 'Invalid Admin credentials';
      }
    }
  } else {
    this.loginForm.markAllAsTouched();
    this.errorMessage = 'Please enter valid details';
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


onInput(event: any, index: number) {
  const input = event.target as HTMLInputElement;
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
