import { Injectable } from '@angular/core';
import { DonorInfo } from '../../models/interface-model';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor() { }
   private pdfUrl: string | null = null;

  setPdf(url: string) {
    this.pdfUrl = url;
  }

  getPdf() {
    return this.pdfUrl;
  }

  clear() {
    this.pdfUrl = null;
  }
  
  private donor: DonorInfo | null = null;

  setDonor(donor: DonorInfo) {
    this.donor = donor;
  }

  getDonor(): DonorInfo | null {
    return this.donor;
  }

 
}
