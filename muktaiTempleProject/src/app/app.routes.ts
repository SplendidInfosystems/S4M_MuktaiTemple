import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './shared/components/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {DashboardRoutingModule} from './features/dashboard/dashboard-routing.module';
import { TempleImagesComponent } from './shared/components/temple-images/temple-images.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },   // login first
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  {path:'temple-gallary', component: TempleImagesComponent},
  {
    path: 'dashboard',
   canActivate: [AuthGuard],       
    loadChildren: () =>
      import('./features/dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }   // catch-all
];