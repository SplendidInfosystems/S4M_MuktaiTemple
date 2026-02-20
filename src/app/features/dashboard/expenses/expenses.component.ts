import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ExpenseInfo } from '../../../core/models/interface-model';
import { LoaderService } from '../../../core/services/loader/loader.service';
import { ToastService } from '../../../core/services/toast/toast.service';
import { DonationService } from '../../../core/services/donation/donation.service';
import { finalize } from 'rxjs/internal/operators/finalize';
import { environment } from '../../../../environments/environment';
import { TempleLocationService } from '../../../core/services/temple-state/temple-location.service';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule,DatePipe],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit {
  expenses: ExpenseInfo[] = [];

    // =========================
  // PAGINATION VARIABLES
  // =========================
  currentPage: number = 1;
  pageSize: number = 5; // records per page
      locationId!: number;



  constructor(private donationService: DonationService,
    private toast: ToastService,
    private loader: LoaderService,
     private templeState: TempleLocationService) { }

  ngOnInit(): void {
     this.templeState.locationId$.subscribe(id => {
      if (id) {
        this.locationId = id;
        this.loadExpenses();
      }
    })
  }



  

  loadExpenses() {

    this.loader.show();

    this.donationService.getExpensesInfo(this.locationId)
      .pipe(
        finalize(() => this.loader.hide())
      )
      .subscribe({
        next: (res) => {
          this.expenses = res.data;
          this.toast.show('Expenses list loaded successfully', 'success');
        },
        error: (err) => {
          this.toast.show('Failed to load expenses info', 'error');

          if (!environment.production) {
            console.error(err);
          }
        }
      });
  }


deleteExpense(expenseId: number) {

  const confirmDelete = confirm('Are you sure you want to delete this expense?');

  if (!confirmDelete) return;

  this.loader.show();

  this.donationService.deleteExpences(expenseId)
    .pipe(finalize(() => this.loader.hide()))
    .subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.toast.show('Expense deleted successfully', 'success');

          // Reload updated list
          this.loadExpenses();
        } else {
          this.toast.show('Failed to delete expense', 'error');
        }
      },
      error: (err) => {
        this.toast.show('Error deleting expense', 'error');

        if (!environment.production) {
          console.error(err);
        }
      }
    });
}

  
    // =========================
    // PAGINATION LOGIC
    // =========================
  
    get totalPages(): number {
      return Math.ceil(this.expenses.length / this.pageSize) || 1;
    }
  
    get paginatedExpences(): ExpenseInfo[] {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.expenses.slice(start, end);
    }
  
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  

}
