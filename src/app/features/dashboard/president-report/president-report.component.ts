import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import {
  Document,
  Packer,
  Paragraph,
  TextRun
} from 'docx';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-president-report',
  standalone: true,
  imports: [CommonModule,TranslateModule],
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

  setRange(type: string, range: string) {
    this.selectedRange[type] = range;
  }

  // 📄 PDF DOWNLOAD
  downloadPDF(title: string, range: string) {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(title, 20, 20);

    doc.setFontSize(12);
    doc.text(`Report Type: ${range}`, 20, 35);
    doc.text("Temple Management System", 20, 45);
    doc.text("Generated on: " + new Date().toLocaleString(), 20, 55);

    doc.save(`${title.replace(/\s/g, '_')}_${range}.pdf`);
  }

  // 📝 WORD DOWNLOAD
  async downloadWord(title: string, range: string) {
    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({
            children: [new TextRun({ text: title, bold: true, size: 32 })]
          }),
          new Paragraph({
            children: [new TextRun(`Report Type: ${range}`)]
          }),
          new Paragraph({
            children: [new TextRun("Temple Management System")]
          }),
          new Paragraph({
            children: [new TextRun("Generated on: " + new Date().toLocaleString())]
          })
        ]
      }]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${title.replace(/\s/g, '_')}_${range}.docx`);
  }

}
