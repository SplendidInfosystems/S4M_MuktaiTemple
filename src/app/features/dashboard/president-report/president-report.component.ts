import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DonationService } from '../../../core/services/donation/donation.service';
import { ToastService } from '../../../core/services/toast/toast.service';
import { LoaderService } from '../../../core/services/loader/loader.service';
import { GenerateReportPayload } from '../../../core/models/interface-model';

@Component({
  selector: 'app-president-report',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './president-report.component.html',
  styleUrl: './president-report.component.css'
})
export class PresidentReportComponent {

  //  IMPORTANT CHANGE: lowercase values only
  ranges = ['daily', 'monthly', 'yearly'];

  //  IMPORTANT CHANGE: default lowercase
  selectedRange: any = {
    donation: 'daily',
    expense: 'daily',
    combined: 'daily'
  };

  constructor(
    private reportService: DonationService,
    private toast: ToastService,
    private loader: LoaderService
  ) {}

  setRange(type: string, range: string) {
    this.selectedRange[type] = range;
  }

  generateReport(
    type: 'donation' | 'expense' | 'combined',
    period: 'daily' | 'monthly' | 'yearly',
    format: 'PDF' | 'WORD'
  ) {
    const payload: GenerateReportPayload = {
      report_type: type,
      period: period, //  NO toLowerCase needed now
      location_id: Number(localStorage.getItem('location_id')),
      generated_by: Number(localStorage.getItem('president_id')),
      file_type: format.toLowerCase() as 'pdf' | 'word'
    };

    console.log('Sending Payload:', payload);

    this.loader.show();

    this.reportService.generateReport(payload).subscribe({
      next: (res: any) => {
        this.loader.hide();

        if (res.success && res.file_url) {
          const link = document.createElement('a');
          link.href = res.file_url;
          link.target = '_blank';

          const extension = format === 'PDF' ? 'pdf' : 'docx';
          link.download = `${type}_${period}.${extension}`;

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          this.toast.show(`${format} downloaded successfully`, 'success');
        } else {
          this.toast.showError('No data found for selected period');
        }
      },
      error: () => {
        this.loader.hide();
        this.toast.showError('Failed to generate report');
      }
    });
  }
}