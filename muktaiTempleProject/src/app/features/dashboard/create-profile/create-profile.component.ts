import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [TranslateModule,ReactiveFormsModule,CommonModule],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.css'
})
export class CreateProfileComponent {
     profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/)
        ]
      ],
      role: ['', Validators.required]
    });
  }

  // 👇 Add this getter so `f` exists in template
  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    }
  }
}
