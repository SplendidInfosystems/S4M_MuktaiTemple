import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'muktaiTempleProject';
   constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('mr');
    this.translate.use('mr'); // 👈 make sure Marathi is active
  }
}
