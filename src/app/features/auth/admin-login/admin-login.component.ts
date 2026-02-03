import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
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

  // ❗ FIRST: stop if form is invalid
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    this.errorMessage = 'Please enter valid details';
    return;
  }

  const { username, password } = this.loginForm.value;

  console.log('Username:', username);
  console.log('Password:', password);

  // ✅ ADMIN LOGIN
  if (this.selectedRole === 'admin') {
    if (username === 'admin' && password === 'Admin@123') {
      console.log('Admin login successful');

      localStorage.setItem('role', 'admin');
      localStorage.setItem('token', 'loggedin');

      this.router.navigate(['/dashboard/admin-Dashboard']);
      return;
    }
    this.errorMessage = 'Invalid Admin credentials';
  }

  // ✅ PRESIDENT LOGIN
  if (this.selectedRole === 'president') {
    if (username === 'president' && password === 'President@123') {
      localStorage.setItem('role', 'president');
      localStorage.setItem('token', 'loggedin');

      this.router.navigate(['/dashboard/donation']);
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
