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

  constructor(private router: Router,private fb: FormBuilder) {
     this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


 

    onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (email === 'admin@gmail.com' && password === 'admin123') {
        localStorage.setItem('token', 'hgjghggsfdyyjhg');
        this.router.navigate(['/Home']);
      } else {
        this.errorMessage = 'Invalid credentials';
      }
    }
  }

   

  showPassword = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}

}
