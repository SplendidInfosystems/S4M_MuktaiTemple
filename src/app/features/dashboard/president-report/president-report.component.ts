import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DonationService } from '../../../core/services/donation/donation.service';
import { ToastService } from '../../../core/services/toast/toast.service';
import { LoaderService } from '../../../core/services/loader/loader.service';
import { GenerateReportPayload } from '../../../core/models/interface-model';
type Period = 'daily' | 'monthly' | 'yearly';
type ReportType = 'donation' | 'expense' | 'combined';
@Component({
  selector: 'app-president-report',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './president-report.component.html',
  styleUrl: './president-report.component.css'
})
export class PresidentReportComponent {
  // ✅ typed union (fixes NG5 error)
  readonly ranges: Period[] = ['daily', 'monthly', 'yearly'];
  selectedRange: Record<ReportType, Period> = {
    donation: 'daily',
    expense: 'daily',
    combined: 'daily'
  };
  constructor(
    private reportService: DonationService,
    private toast: ToastService,
    private loader: LoaderService
  ) {}
  setRange(type: ReportType, range: Period) {
    this.selectedRange[type] = range;
  }
  generateReport(
    type: ReportType,
    period: Period,
    format: 'PDF' | 'WORD'
  ) {
    const locationId = Number(localStorage.getItem('location_id'));
    const presidentId = Number(localStorage.getItem('president_id'));
    if (!locationId || !presidentId) {
      this.toast.showError('Invalid user or location');
      return;
    }
    // ✅ NOW MATCHES INTERFACE + LAMBDA
    const payload: GenerateReportPayload = {
      report_type: type,
      period: period,
      location_id: locationId,
      generated_by: presidentId,
      file_type: format === 'PDF' ? 'pdf' : 'docx'
    };
    console.log('Sending Payload:', payload);
    this.loader.show();
    this.reportService.generateReport(payload).subscribe({
      next: (res: any) => {
        this.loader.hide();
        const fileUrl = res?.file_url;
        if (res?.success && fileUrl) {
          const link = document.createElement('a');
          link.href = fileUrl;
          link.target = '_blank';
          const extension = format === 'PDF' ? 'pdf' : 'docx';
          link.download = `${type}_${period}.${extension}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          this.toast.showSuccess(`${format} downloaded successfully`);
        } else {
          this.toast.showError('No data found for selected period');
        }
      },
      error: (err) => {
        console.error(err);
        this.loader.hide();
        this.toast.showError('Failed to generate report');
      }
    });
  }
}