import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../../../config/endpoint';
import { APP_CONFIG } from '../../../app.config';
import { Observable } from 'rxjs';
import { AdminDashboardData, AdminLoginResponse, DonationReceipt, DonorInfo, ExpenseInfo } from '../../models/interface-model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  getDonorById(id: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }
/**
 * Function Name : donation table data 
 * Completed On  : 12/02/2026 * */

PostAdminLogin(payload: any): Observable<AdminLoginResponse> {
  return this.http.post<AdminLoginResponse>(
    APP_CONFIG.BASE_URL + ENDPOINTS.GET_ADMIN_LOGIN,
    payload
  );
}


   getDonorInfo(): Observable<{ success: boolean; data: DonorInfo[] }> {
  return this.http.get<{ success: boolean; data: DonorInfo[] }>(
    APP_CONFIG.BASE_URL + ENDPOINTS.GET_DONOR_INFO
  );
}
  //  expences table data 
   getExpensesInfo(): Observable<{ success: boolean; data: ExpenseInfo[] }> {
  return this.http.get<{ success: boolean; data: ExpenseInfo[] }>(
    APP_CONFIG.BASE_URL + ENDPOINTS.GET_EXPENSES_INFO
  );
}

//  admin dashboard data
getAdminDashboardData(adminId: number): Observable<{ body: AdminDashboardData } | AdminDashboardData> {
  return this.http.get<{ body: AdminDashboardData } | AdminDashboardData>(`${APP_CONFIG.BASE_URL}${ENDPOINTS.GET_ADMIN_DASHBOARD_DATA}?admin_id=${adminId}`);
}

getDonationReceipt(donationId: number) {
  return this.http.get<{
    success: boolean;
    receipt: DonationReceipt;
  }>(
    `${APP_CONFIG.BASE_URL}${ENDPOINTS.GET_DONATION_RECEIPT}?donation_id=${donationId}`
  );
}


}
