import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  contact = {
    name: '',
    email: '',
    mobile: '',
    message: ''
  };

  readonly ownerWhatsApp = '919503961801';

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const text = `Name: ${this.contact.name}\nEmail: ${this.contact.email}\nMobile: ${this.contact.mobile}\nMessage: ${this.contact.message}`;
    const whatsappUrl = `https://wa.me/${this.ownerWhatsApp}?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, '_blank');
  }
}
