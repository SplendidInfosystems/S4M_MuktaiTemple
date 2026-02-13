import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DonationService } from '../../../core/services/donation/donation.service';
import { DonorInfo } from '../../../core/models/interface-model';
import { ToastService } from '../../../core/services/toast/toast.service';
import { LoaderService } from '../../../core/services/loader/loader.service';
import { finalize } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, DatePipe],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent {

  // selectedDonation: any;
  donors: DonorInfo[] = [];

  constructor(private donationService: DonationService,
    private toast: ToastService,
    private loader: LoaderService,
    private router: Router
)
     {
           this.loadDonors();
     }


/**
 * Function Name : loadDonors
 * Completed On  : 12/02/2026 * Description   : Loads donor function done.*/


loadDonors() {

  this.loader.show();

  this.donationService.getDonorInfo()
    .pipe(
      finalize(() => this.loader.hide())
    )
    .subscribe({
      next: (res) => {
        this.donors = res.data;
        this.toast.show('Donor list loaded successfully', 'success');
      },
      error: (err) => {
        this.toast.show('Failed to load donor info', 'error');

        if (!environment.production) {
          console.error(err);
        }
      }
    });
}


  generatePDF(donation: DonorInfo) {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Temple Donation Receipt', 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [['Field', 'Value']],
      body: [
        ['Donor Name', donation.name],
        ['Date', new Date(donation.donation_date).toLocaleDateString()],
        ['Amount', `₹${donation.amount}`],
        ['Payment Mode', donation.payment_method]
      ]
    });

    // doc.autoPrint();
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  }

}

