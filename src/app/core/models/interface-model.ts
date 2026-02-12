// donation table interface

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

// expences table interface 

export interface ExpenseInfo {
expense_id:string;
 category: string;
amount: number;
description:string;
expense_date:string;
status:string;

}

// admin dashboard data interface

export interface AdminDashboardData {
  location_name: string;
  today_total_donations: number;
  total_devotees: number;
  cash_donations:number;
  online_donations:number;
  weekly_donation_trend:number;
  donation_distribution:string;
  cash_percentage:number;
  online_percentage:number;

}
