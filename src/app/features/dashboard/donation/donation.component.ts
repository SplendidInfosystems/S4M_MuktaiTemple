import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


interface Donation {
  name: string;
  amount: number;
  mode: string;
  date: string;
}

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [CommonModule, RouterLink,TranslateModule],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent {
  donations: Donation[] = [
    {
      "name": "Ramesh Patil",
      "amount": 1100,
      "mode": "Cash",
      "date": "15/01/2026"
    },
    {
      "name": "Sunita Deshmukh",
      "amount": 2100,
      "mode": "Online",
      "date": "15/01/2026"
    },
    {
      "name": "Vijay Kulkarni",
      "amount": 500,
      "mode": "Cash",
      "date": "15/01/2026"
    },
    {
      "name": "Priya Jadhav",
      "amount": 5100,
      "mode": "Online",
      "date": "15/01/2026"
    }
  ];
  selectedDonation: any;


// generatePDF(d: any) {
//   const doc = new jsPDF();

//   doc.setFontSize(16);
//   doc.text('Temple Donation Receipt', 20, 20);

//   doc.setFontSize(12);
//   doc.text(`Name: ${d.name}`, 20, 40);
//   doc.text(`Amount: ₹${d.amount}`, 20, 50);
//   doc.text(`Mode: ${d.mode}`, 20, 60);
//   doc.text(`Date: ${d.date}`, 20, 70);

//   doc.save(`Donation_Receipt_${d.name}.pdf`);
// }
generatePDF(donation: Donation) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Temple Donation Receipt', 14, 15);

  autoTable(doc, {
    startY: 25,
    head: [['Field', 'Value']],
    body: [
      ['Donor Name', donation.name],
      ['Date', donation.date],
      ['Amount', `₹${donation.amount}`],
      ['Payment Mode', donation.mode]
    ]
  });

  // 👉 Open PRINT preview instead of auto-download
  doc.autoPrint();

  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // Open in new tab (Print + Download both available)
  window.open(pdfUrl, '_blank');
}

}

