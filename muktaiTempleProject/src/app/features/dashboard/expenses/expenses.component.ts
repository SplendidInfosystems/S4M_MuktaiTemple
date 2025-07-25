import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent {
  constructor(private router: Router) {}
  openAddExpenseModal() {
    this.router.navigate(['/dashboard/add-expenses']);
    // Logic to open the add expense modal
  }
expenseData = [{
    date: '01.01.25',
    expenseName: 'Electricity Bill',
    category: 'Utilities',
    amount: '200 Rs',
    description: 'Monthly electricity bill payment',
    state: 'Paid'
},
{
     date: '01.02.25',
    expenseName: 'Electricity Bill',
    category: 'Utilities',
    amount: '400 Rs',
    description: 'Monthly electricity bill payment',
    state: 'unpaid'
},
{
     date: '05.03.25',
    expenseName: ' Bill',
    category: 'Utilities',
    amount: '500 Rs',
    description: 'Monthly electricity bill payment',
    state: 'paid'
},
{
     date: '05.05.25',
    expenseName: 'Electricity Bill',
    category: 'Utilities',
    amount: '700 Rs',
    description: 'Monthly electricity bill payment',
    state: 'paid'
},
{
     date: '05.05.25',
    expenseName: 'Electricity Bill',
    category: 'Utilities',
    amount: '700 Rs',
    description: 'Monthly electricity bill payment',
    state: 'paid'
},

]
}
