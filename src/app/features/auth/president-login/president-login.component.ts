import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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
    selectedRole: 'admin' | 'president' | null = 'president';
      errorMessage: string | null = null;

  
  
  
    
    constructor(private fb: FormBuilder, private router: Router) {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
      localStorage.setItem('role', 'president'); // or 'admin'
    }
  
   onSubmit() {
    this.submitted = true;
  
    // ❗ FIRST: stop if form is invalid
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Please enter valid details';
      return;
    }
  
    const { username, password } = this.loginForm.value;
  
    console.log('Username:', username);
    console.log('Password:', password);
    // ✅ PRESIDENT LOGIN
    if (this.selectedRole === 'president') {
      if (username === 'president' && password === 'President@123') {
        localStorage.setItem('role', 'president');
        localStorage.setItem('token', 'loggedin');
  
        this.router.navigate(['/dashboard/president-Dashboard']);
        return;
      }
      this.errorMessage = 'Invalid President credentials';
    }
  }
  
  
  
    goBack() {
      this.router.navigate(['/login']);
    }
    get f() {
    return this.loginForm.controls;
  }

}
