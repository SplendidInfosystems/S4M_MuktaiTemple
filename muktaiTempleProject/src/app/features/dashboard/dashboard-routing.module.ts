import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ExpensesComponent } from './expenses/expenses.component';

const routes: Routes = [
  

     {
    path: '',
    component: LayoutComponent,
    children: [
    
      {
        path:'expenses',
        loadComponent: () => import('./expenses/expenses.component').then(m => m.ExpensesComponent)
      },
      {
        path:'add-expenses',
        loadComponent:()=> import('./add-expences/add-expences.component').then(m =>m.AddExpencesComponent)
      },
      {
        path :'donation',
        loadComponent: () => import('./donation/donation.component').then(m => m.DonationComponent)
      },
      {
        path:'add-donor',
        loadComponent: () => import('./add-donor/add-donor.component').then(m => m.AddDonorComponent)
      },
      {
        path:'contact-us',
        loadComponent: () => import('./contact-us/contact-us.component').then(m => m.ContactUsComponent)
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
