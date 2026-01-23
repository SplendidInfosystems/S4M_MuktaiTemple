import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

currentLang: 'mr' | 'en' = 'mr';

  constructor(private translate: TranslateService) {
  
  }


}
