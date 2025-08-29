import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddExpencesService {
   private expenses: any[] = [];

  getExpenses() {
    return this.expenses;
  }

  addExpense(expense: any) {
    this.expenses.push(expense);
  }

  constructor() { }
}
