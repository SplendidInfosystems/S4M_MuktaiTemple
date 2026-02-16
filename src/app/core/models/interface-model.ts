// ================= DONATION TABLE =================
export interface DonorInfo {
  donor_id: string;
  name: string;
  mobile_number: string;
  amount: number;
  date: string;
  amount_in_words: string;
  payment_method: string;
  donation_date: string;
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

// ================= EXPENSE TABLE =================
export interface ExpenseInfo {
  expense_id: string;
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


