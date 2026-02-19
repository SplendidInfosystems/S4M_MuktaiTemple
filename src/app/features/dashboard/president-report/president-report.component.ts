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
  getReportId(type: string, range: string): string {
  const map: any = {
    donation: { Daily: '1', Monthly: '2', Yearly: '3' },
    expense: { Daily: '4', Monthly: '5', Yearly: '6' },
    combined: { Daily: '7', Monthly: '8', Yearly: '9' }
  };

  return map[type]?.[range] || '1';
}

  // ✅ FIXED DOWNLOAD FUNCTION
downloadReportById(type: string, range: string) {
  const reportId = this.getReportId(type, range); // mapping logic

  this.reportService.downloadReport(reportId).subscribe({
    next: (res) => {
      if (!res.success || !res.download_url) {
        alert('Report not available');
        return;
      }

      // ✅ open S3 pre-signed URL
      window.open(res.download_url, '_blank');
    },
    error: () => {
      alert('Download failed');
    }
  });
}

downloadPDF(type: string, range: string) {
  const reportId = this.getReportId(type, range);

  this.reportService.downloadReport(reportId).subscribe({
    next: (res: ReportResponse) => {

      if (!res.success || !res.download_url) {
        alert('Report not available');
        return;
      }

      // 🔥 Fetch TXT content from S3 URL
      fetch(res.download_url)
        .then(response => response.text())
        .then(textData => {

          const doc = new jsPDF();
          const lines = textData.split('\n');

          doc.setFontSize(12);
          doc.text(lines, 10, 10);

          doc.save(`${type}_${range}_report.pdf`);
        });

    },
    error: () => alert('Download failed')
  });
}

downloadWord(type: string, range: string) {
  const reportId = this.getReportId(type, range);

  this.reportService.downloadReport(reportId).subscribe({
    next: async (res: ReportResponse) => {

      if (!res.success || !res.download_url) {
        alert('Report not available');
        return;
      }

      const response = await fetch(res.download_url);
      const textData = await response.text();

      const doc = new Document({
        sections: [{
          children: textData
            .split('\n')
            .map(line => new Paragraph(line))
        }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${type}_${range}_report.docx`);
    },
    error: () => alert('Download failed')
  });
}



}
