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

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent

    },

    {
        path: 'header',
        component: HeaderComponent
    },
    {
        path: 'about-us',
        component: AboutUsComponent
    },
    {
        path:'daily-programs',
        component:DailyProgramsComponent

    },
    {
        path:'monthly-events',
        component:MonthlyEventComponent

    },
    {

        path:'nearby-places',
        component:NearbyPlacesComponent
    },
    {
        path:'team',
        component:TeamComponent

    },
    {
        path:'contact-us',
        component:ContactUsComponent

    },
    {
        path:'footer',
        component:FooterComponent
    }




];
