import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import {SharedModule} from './shared/shared.module'
import { HomeComponent } from './shared/components/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {DashboardRoutingModule} from './features/dashboard/dashboard-routing.module';

export const routes: Routes = [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'header',
        component:HeaderComponent

    },
     {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule),
  },
    {
        path: 'Home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    }
];
