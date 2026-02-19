import { Routes } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './shared/components/home/home.component';
import { AboutUsComponent } from './shared/components/about-us/about-us.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { DailyProgramsComponent } from './shared/components/daily-programs/daily-programs.component';
import { MonthlyEventComponent } from './shared/components/monthly-event/monthly-event.component';
import { NearbyPlacesComponent } from './shared/components/nearby-places/nearby-places.component';
import { TeamComponent } from './shared/components/team/team.component';
import { ContactUsComponent } from './shared/components/contact-us/contact-us.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AdminLoginComponent } from './features/auth/admin-login/admin-login.component';
import { PresidentLoginComponent } from './features/auth/president-login/president-login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: 'home',
    //     pathMatch: 'full'
    // },
    // {

    //     path: 'login',
    //     component: LoginComponent
    // },
    // {
    //     path: 'admin-login',
    //     component: AdminLoginComponent

    // },
    // {

    //     path: 'president-login',
    //     component: PresidentLoginComponent
    // },
    // {
    //     path: 'home',
    //     component: HomeComponent

    // },

    // {
    //     path: 'header',
    //     component: HeaderComponent
    // },
    // {
    //     path: 'about-us',
    //     component: AboutUsComponent
    // },
    // {
    //     path: 'daily-programs',
    //     component: DailyProgramsComponent

    // },
    // {
    //     path: 'monthly-events',
    //     component: MonthlyEventComponent

    // },
    // {

    //     path: 'nearby-places',
    //     component: NearbyPlacesComponent
    // },
    // {
    //     path: 'team',
    //     component: TeamComponent

    // },
    // {
    //     path: 'contact-us',
    //     component: ContactUsComponent

    // },
    // {
    //     path: 'footer',
    //     component: FooterComponent
    // },




     {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      { path: 'home', component: HomeComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'daily-programs', component: DailyProgramsComponent },
      { path: 'monthly-events', component: MonthlyEventComponent },
      { path: 'nearby-places', component: NearbyPlacesComponent },
      { path: 'team', component: TeamComponent },
      { path: 'contact-us', component: ContactUsComponent },

      { path: 'login', component: LoginComponent },
      { path: 'admin-login', component: AdminLoginComponent },
      { path: 'president-login', component: PresidentLoginComponent },
    ]
  },  //  DASHBOARD (NO HEADER / FOOTER)
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
   canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./features/dashboard/dashboard-routing.module')
        .then(m => m.DashboardRoutingModule),
  },




];
