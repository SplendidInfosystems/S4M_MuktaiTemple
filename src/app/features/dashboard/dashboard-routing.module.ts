import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],    // 🔥 Protect ALL children

    children: [
      {
        path:'admin-Dashboard',
        loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)

      },
      {

        path:'president-Dashboard',
        loadComponent() {
          return import('./president-dashboard/president-dashboard.component').then(m => m.PresidentDashboardComponent);
        }
      },
      {
        path:'donation',
        loadComponent() {
          return import('./donation/donation.component').then(m => m.DonationComponent);
        },
      },
      {
        path:'receipts',
        loadComponent() {
          return import('./receipts/receipts.component').then(m => m.ReceiptsComponent);
        }
      },
      {
        path:'expenses',
        loadComponent() {
          return import('./expenses/expenses.component').then(m => m.ExpensesComponent);
        },
      },
      {
        path:'add-expense',
        loadComponent() {
          return import('./add-expenses/add-expenses.component').then(m => m.AddExpensesComponent);}
      },
      {
        path:'add-donation',
        loadComponent() {
          return import('./add-donation/add-donation.component').then(m => m.AddDonationComponent);
        }
      },
      {
        path:'president-approval',
        loadComponent() {
          return import('./president-approvals/president-approvals.component').then(m => m.PresidentApprovalsComponent);
        }
      }

     
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { 
 
  
}
