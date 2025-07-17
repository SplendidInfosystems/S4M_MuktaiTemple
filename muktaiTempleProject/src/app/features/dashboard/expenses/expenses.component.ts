import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent {
  constructor(private router: Router) {}
  openAddExpenseModal() {
    this.router.navigate(['/dashboard/add-expenses']);
    // Logic to open the add expense modal
  }

}
