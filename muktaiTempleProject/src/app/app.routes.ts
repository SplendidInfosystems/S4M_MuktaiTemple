import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './shared/components/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';

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
        path: 'Home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    }
];
