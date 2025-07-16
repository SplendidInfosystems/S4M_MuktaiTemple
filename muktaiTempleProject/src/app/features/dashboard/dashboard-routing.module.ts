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
        path: 'side-bar',
        loadComponent: () =>
          import('./sidebar/sidebar.component').then(m => m.SidebarComponent)
      },
      {
        path: 'nav-bar',
        loadComponent: () =>
          import('./nav/nav.component').then(m => m.NavComponent)
      },
      {
        path:'expenses',
        loadComponent: () => import('./expenses/expenses.component').then(m => m.ExpensesComponent)
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
