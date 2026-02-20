import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DonationService } from '../../../core/services/donation/donation.service';
import { ReportResponse } from '../../../core/models/interface-model';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph } from 'docx';

@Component({
  selector: 'app-president-report',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './president-report.component.html',
  styleUrl: './president-report.component.css'
})
export class PresidentReportComponent {

ranges = ['Daily', 'Monthly', 'Yearly'];
  selectedRange: any = {
    donation: 'Daily',
    expense: 'Daily',
    combined: 'Daily'
  };

  constructor(private reportService: DonationService) {}

  setRange(type: string, range: string) {
    this.selectedRange[type] = range;
  }

  // 🔥 Dynamic ID Generator
  private generateReportId(type: string, range: string, format: string): string {

    const key = `${type}_${range.toLowerCase()}_${format.toLowerCase()}`;

    const reportMap: any = {
      donation_daily_pdf: '1',
      donation_monthly_pdf: '2',
      donation_yearly_pdf: '12',

      expense_daily_pdf: '5',
      expense_monthly_pdf: '6',
      expense_yearly_pdf: '7',

      combined_daily_pdf: '8',
      combined_monthly_pdf: '9',
      combined_yearly_pdf: '10',

      // if WORD format needed
      donation_daily_word: '13',
      donation_monthly_word: '14',
      donation_yearly_word: '15'
    };

    return reportMap[key];
  }

  // 🔥 Final Download Function
  downloadReport(type: string, range: string, format: string) {

    const reportId = this.generateReportId(type, range, format);

    if (!reportId) {
      console.error('Report ID not found');
      return;
    }

    this.reportService.downloadReport(reportId).subscribe({
      next: (res) => {
        if (res.success && res.download_url) {
          window.open(res.download_url, '_blank');
        }
      },
      error: (err) => {
        console.error('Download failed', err);
      }
    });
  }

}
