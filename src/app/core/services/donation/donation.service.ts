import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../../../config/endpoint';
import { APP_CONFIG } from '../../../app.config';
import { map, Observable } from 'rxjs';
import {  AddDonationRequest, AddDonationResponse, AddExpenseRequest, AddExpenseResponse, AdminDashboardData, AdminLoginResponse, DonationReceipt, DonorInfo, ExpenseInfo, ExpenseRequest, ExpenseRequestResponse, PresidentDashboardResponse, PresidentLoginResponse, ReportResponse, TempleLocation } from '../../models/interface-model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
 

  constructor(private http: HttpClient) { }
/**
 * Function Name : API'S SERVICES 
 * Completed On  : 12/02/2026 * */


//  =============================== GET API'S ===================================

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

//  president dashboard data
getPresidentDashboard(): Observable<PresidentDashboardResponse> {
  return this.http.get<PresidentDashboardResponse>(
    `${APP_CONFIG.BASE_URL}${ENDPOINTS.GET_PRESIDENT_DASHBOARD_DATA}`
  );
}


getDonationReceipt(donationId: number) {
  return this.http.get<{
    success: boolean;
    receipt: DonationReceipt;
  }>(
    `${APP_CONFIG.BASE_URL}${ENDPOINTS.GET_DONATION_RECEIPT}?donation_id=${donationId}`
  );
}

downloadReport(reportId: string) {
  return this.http.get<ReportResponse>(
    `${APP_CONFIG.BASE_URL}${ENDPOINTS.GET_DOWNLOAD_REPORT}?report_id=${reportId}`
  );
}








// EXPENCES REQUEST APPROVAL OR REJECT STATUS API'S

  // ================= GET PENDING REQUESTS =================
  getRequests(status: string): Observable<ExpenseRequestResponse> {
    return this.http.get<ExpenseRequestResponse>(
      `${APP_CONFIG.BASE_URL}${ENDPOINTS.GET_EXPENSE_REQUESTS}?status=${status}`
    );
  }

  // ================= UPDATE STATUS =================
  updateStatus(
    request_id: number,
    status: 'accepted' | 'rejected'
  ): Observable<any> {

    // 🔥 get president id from login storage
    const president_id = Number(localStorage.getItem('president_id')) || 1;

   return this.http.patch(
  `${APP_CONFIG.BASE_URL}${ENDPOINTS.UPDATE_EXPENSE_STATUS}`,
  {
    request_id,
    president_id,
    status
  }
);
  }

  // ================= GET TEMPLE LOCATIONS =================
getTempleLocations(): Observable<TempleLocation[]> {
  return this.http.get<any>(
    `${APP_CONFIG.BASE_URL}${ENDPOINTS.GET_TEMPLE_LOCATIONS}`
  ).pipe(
    map((res: any) => {
      // handle both API formats safely
      if (Array.isArray(res)) return res;
      if (res?.body && Array.isArray(res.body)) return res.body;
      return [];
    })
  );
}


// ============================= POST API'S ALL ============================

// ADMIN LOGIN API

PostAdminLogin(payload: any): Observable<AdminLoginResponse> {
  return this.http.post<AdminLoginResponse>(
    APP_CONFIG.BASE_URL + ENDPOINTS.GET_ADMIN_LOGIN,
    payload
  );
}
// PRESIDENT LOGIN API
PostPresidentLogin(payload: any): Observable<PresidentLoginResponse> {
  return this.http.post<PresidentLoginResponse>(
    APP_CONFIG.BASE_URL + ENDPOINTS.GET_PRESIDENT_LOGIN,
    payload
  );
}

// ADD DONATION API

PostAddDonation(payload: AddDonationRequest): Observable<AddDonationResponse> {
  return this.http.post<AddDonationResponse>(
    APP_CONFIG.BASE_URL + ENDPOINTS.POST_ADD_DONATION,
    payload
  );
}
// ADD EXPENSE API

PostAddExpense(payload: AddExpenseRequest): Observable<any> {
  return this.http.post(
    APP_CONFIG.BASE_URL + ENDPOINTS.POST_ADD_EXPENSE,
    payload
  );
}



}
