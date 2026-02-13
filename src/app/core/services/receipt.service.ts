import { Injectable } from '@angular/core';
import { DonorInfo } from '../models/interface-model';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor() { }
  private donor: DonorInfo | null = null;

setDonor(donor: DonorInfo) {
  this.donor = donor;
}

getDonor() {
  return this.donor;
}

}
