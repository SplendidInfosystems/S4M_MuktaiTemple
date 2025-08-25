import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [TranslateModule,ReactiveFormsModule],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.css'
})
export class CreateProfileComponent {
    adminForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.adminForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: [''],
      profilePic: [null]
    });
  }

  onSubmit() {
    if (this.adminForm.valid) {
      console.log(this.adminForm.value);
      // 🚀 API call to create admin goes here
    } else {
      this.adminForm.markAllAsTouched();
    }
  }

}
