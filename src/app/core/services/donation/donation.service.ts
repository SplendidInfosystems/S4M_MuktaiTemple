import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../../../config/endpoint';
import { APP_CONFIG } from '../../../app.config';
import { Observable } from 'rxjs';
import { DonorInfo, ExpenseInfo } from '../../models/interface-model';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(private http: HttpClient) { }

   getDonorInfo(): Observable<{ success: boolean; data: DonorInfo[] }> {
  return this.http.get<{ success: boolean; data: DonorInfo[] }>(
    APP_CONFIG.BASE_URL + ENDPOINTS.GET_DONOR_INFO
  );
}
   getExpensesInfo(): Observable<{ success: boolean; data: ExpenseInfo[] }> {
  return this.http.get<{ success: boolean; data: ExpenseInfo[] }>(
    APP_CONFIG.BASE_URL + ENDPOINTS.GET_EXPENSES_INFO
  );
}

}
