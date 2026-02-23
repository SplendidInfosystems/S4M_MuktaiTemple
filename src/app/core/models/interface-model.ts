// ================= DONATION TABLE =================
export interface DonorInfo {
  donor_id:number;
  name: string;
  mobile_number: string;
  amount: number;
  date: string;
  amount_in_words: string;
  payment_method: string;
  donation_date: string;
  location_id: number;
}

// =================================ADMIN LOGIN =================

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  data: {
    admin_id: number;
    name: string;
    location_id: number;
    president_id: number;
  };
}

export interface PresidentLoginResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
    president_id: number;
    mobile_number:number;
  };
}


// ================= EXPENSE TABLE =================
export interface ExpenseInfo {
  expense_id: number;
  category: string;
  amount: number;
  description: string;
  expense_date: string;
  status: string;
}

// ================= DASHBOARD TYPES =================

// Weekly trend can be:
// 1) number[]
// 2) { labels: string[], values: number[] }
// 3) key-value object
export type WeeklyDonationTrend =
  | number[]
  | { labels: string[]; values: number[] }
  | Record<string, number>
  | null;

export interface DonationDistribution {
  cash_percentage?: number;
  online_percentage?: number;
}

// ================= ADMIN DASHBOARD =================
export interface AdminDashboardData {
  location_name: string;
  today_total_donations: number;
  total_devotees: number;
  cash_donations: number;
  online_donations: number;

  weekly_donation_trend?: WeeklyDonationTrend;
  donation_distribution?: DonationDistribution | null;

  cash_percentage?: number;
  online_percentage?: number;
}


// =====================================Donation Receipt =================
export interface DonationReceipt {
  receipt_id: number;
  receipt_no: string;
  generated_date: string;
  generated_by: string;

  donor_id: number;
  donor_name: string;
  address: string;
  mobile_number: string;

  amount: number;
  amount_in_words: string;
  payment_method: string;
  donation_date: string;

  location_name: string;
}


// ================= ADD DONATION REQUEST =================
// ================= ADD DONATION REQUEST =================
export interface AddDonationRequest {
  name: string;
  amount: number;
  payment_method: 'Cash' | 'Online';
  address: string;
  mobile_number: string;
  donation_date: string;
  amount_in_words?: string;
  location_id?: number;
  transaction_id: string;   // ✅ changed to string
  admin_id: number;
  president_id: number;
}

// ================= ADD DONATION RESPONSE =================
export interface AddDonationResponse {
  success: boolean;
  message: string;
  data?: {
    donation_id: number;
  };
}


// ================= ADD EXPENSE REQUEST =================
export interface AddExpenseRequest {
  category: string;
  description: string;
  amount: number;
  expense_date: string;
  admin_id: number;
}

// ================= ADD EXPENSE RESPONSE =================
export interface AddExpenseResponse {
  success: boolean;
  message: string;
  data?: any;
}


// ================= PRESIDENT DASHBOARD =================

export interface TempleComparison {
  location: string;
  daily: number;
  weekly: number;
  monthly: number;
  devotees: number;
}

export interface MonthlyTrendItem {
  month: string;
  location: string;
  total: number;
}

export interface PresidentDashboardBody {
  today_total: number;
  week_total: number;
  month_total: number;
  year_total: number;
  temple_comparison: TempleComparison[];
  monthly_trend: MonthlyTrendItem[];
}

export interface PresidentDashboardResponse {
  statusCode: number;
  body: PresidentDashboardBody;
}
export interface ExpenseRequest {
  request_id: number;
  expense_id: number;
  category: string;
  description: string;
  amount: number;
  expense_date: string;
  status: string;
  admin_name: string;
  location_name: string;
  request_date: string;
}

export interface ExpenseRequestResponse {
  success: boolean;
  data: ExpenseRequest[];
}


export interface ReportResponse {
  success: boolean;
  report_id: string;
  report_type: string;
  period: string;
  file_format: string;
  download_url: string;
}


// ================= TEMPLE LOCATION =================
export interface TempleLocation {
  location_id: number;
  location_name: string;
  created_at: string;
}

export interface TempleLocationResponse {
  statusCode?: number;
  body: TempleLocation[];
}
export interface GenerateReportPayload {
  report_type: 'donation' | 'expense' | 'combined';
  period: 'daily' | 'monthly' | 'yearly';
  location_id: number;
  generated_by: number;
  file_type: 'pdf' | 'word';
}



