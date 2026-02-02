import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
   loginForm: FormGroup;
  submitted = false;
  selectedRole: 'admin' | 'president' | null = 'admin';
    errorMessage: string | null = null;




  
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
     


      if (this.selectedRole === 'admin') {
      if (this.loginForm.get('username')?.value === 'admin@gmail.com' && this.loginForm.get('password')?.value === 'Admin@123') {
        localStorage.setItem('role', 'admin');
        localStorage.setItem('temple', this.loginForm.get('temple')?.value || '');

        // 🔥 FIX: add token here
        localStorage.setItem('token', 'loggedin');

        this.router.navigate(['/dashboard']);
        return;
      }
      this.errorMessage = 'Invalid Admin credentials';
    }

     if (this.selectedRole === 'president') {
      if (this.loginForm.get('username')?.value === 'president@gmail.com' && this.loginForm.get('password')?.value === 'President@123') {
        localStorage.setItem('role', 'president');
        localStorage.setItem('temple', this.loginForm.get('temple')?.value || '');

        // 🔥 FIX: add token here
        localStorage.setItem('token', 'loggedin');

        this.router.navigate(['/dashboard/donation']);
        return;
      }
      this.errorMessage = 'Invalid President credentials';
    }

  } else {
    this.loginForm.markAllAsTouched();
    this.errorMessage = 'Please enter valid details';
  }
  }



  goBack() {
    this.router.navigate(['/login']);
  }
  get f() {
  return this.loginForm.controls;
}
  

}
