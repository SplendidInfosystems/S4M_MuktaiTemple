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
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/) // at least one letter and one number
      ]]
    });
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

  // Allow only digits
  if (!/^[0-9]$/.test(value)) {
    input.value = '';
    return;
  }

  // Move to next input
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
      input.value = ''; // Clear the input manually
    }
  }

  // Prevent non-numeric input
  if (event.key.length === 1 && !/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
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
