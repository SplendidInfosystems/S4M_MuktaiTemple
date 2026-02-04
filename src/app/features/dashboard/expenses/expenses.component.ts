import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent {
  expenses = [
  {
    type: 'Prasad Materials',
    amount: 3500,
    status: 'Approved',
    date: '14/01/2026'
  },
  {
    type: 'Kirtan Expense',
    amount: 8000,
    status: 'Pending',
    date: '15/01/2026'
  },
  {
    type: 'Decoration',
    amount: 4200,
    status: 'Pending',
    date: '15/01/2026'
  }
];


}
