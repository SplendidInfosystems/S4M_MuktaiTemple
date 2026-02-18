import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DonationService } from '../../../core/services/donation/donation.service';
import { ReportResponse } from '../../../core/models/interface-model';

@Component({
  selector: 'app-president-report',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './president-report.component.html',
  styleUrl: './president-report.component.css'
})
export class PresidentReportComponent {

  constructor(private reportService: DonationService) {}

  ranges = ['Daily', 'Monthly', 'Yearly'];

  selectedRange: any = {
    donation: 'Daily',
    expense: 'Daily',
    combined: 'Daily'
  };

  setRange(type: string, range: string) {
    this.selectedRange[type] = range;
  }

  // ✅ FIXED DOWNLOAD FUNCTION
downloadReportById(type: string, range: string) {
  console.log('Type:', type);
  console.log('Range:', range);

  this.reportService.downloadReport(type, range).subscribe({
    next: (blob: Blob) => {
      if (!blob || blob.size === 0) {
        console.error('Report not available');
        alert('Report not available');
        return;
      }

      const fileName = `${type}_report_${range}.pdf`;

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    error: (err) => {
      console.error('Download failed', err);
      alert('Download failed');
    }
  });
}


}
