import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import {SharedModule} from './shared/shared.module'
import { HomeComponent } from './shared/components/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {DashboardRoutingModule} from './features/dashboard/dashboard-routing.module';
import { AboutUSComponent } from './shared/components/about-us/about-us.component';

// export const routes: Routes = [
//   { path: 'home', component: HomeComponent },
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
// //   { path: '**', redirectTo: '/home' },
//   {
//     path: 'login',
//     component: LoginComponent
//     },
//     {
//         path:'header',
//         component:HeaderComponent

//     },
//      {
//     path: 'dashboard',
//     loadChildren: () =>
//       import('./features/dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule),
//   },
    
// ];


export const routes: Routes = [
  { path: 'login', component: LoginComponent },   // login first
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'about-us', component: AboutUSComponent },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }   // catch-all
];