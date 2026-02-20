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



 downloadReport(type: string, period: string, format: string) {

  const locationId = Number(localStorage.getItem('location_id')) || 9;
  const generatedBy = Number(localStorage.getItem('president_id')) || 1;

  const payload = {
    report_type: type,
    period: period.toLowerCase(),
    location_id: locationId,
    generated_by: generatedBy
  };

  // 🔥 Step 1: Generate Report
  this.reportService.generateReport(payload).subscribe({
    next: (genRes: any) => {

      if (!genRes?.report_id) {
        console.error('Report ID not returned');
        return;
      }

      const reportId = genRes.report_id;

      // 🔥 Step 2: Download Report
      this.reportService.downloadReport(reportId).subscribe({
        next: (downloadRes: any) => {

          if (downloadRes?.success && downloadRes?.download_url) {
            window.open(downloadRes.download_url, '_blank');
          } else {
            console.error('Download URL not found');
          }

        },
        error: err => console.error('Download error', err)
      });

    },
    error: err => console.error('Generate report error', err)
  });

}

}
