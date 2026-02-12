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
