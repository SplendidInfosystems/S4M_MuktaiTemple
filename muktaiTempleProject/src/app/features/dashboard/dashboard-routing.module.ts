import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'Home-Dashboard',
     pathMatch: 'full'
  },
  

 {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path:'Home-Dashboard',
        loadComponent: () => import('./home-dashboard/home-dashboard.component').then(m => m.HomeDashboardComponent)

      },
    
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
      },
      {
        path: 'expenses-request',
        loadComponent: () => import('./expences-request/expences-request.component').then(m => m.ExpencesRequestComponent)
      },
      {
         path: 'add-expences-request',
         loadComponent: ()=>import('./add-expences-request/add-expences-request.component').then(m => m.AddExpencesRequestComponent)


      },
      {
        path:'create-profile',
        loadComponent() {
          return import('./create-profile/create-profile.component').then(m => m.CreateProfileComponent);
        },
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
