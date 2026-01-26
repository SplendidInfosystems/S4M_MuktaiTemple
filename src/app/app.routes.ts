import { Routes } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './shared/components/home/home.component';
import { AboutUsComponent } from './shared/components/about-us/about-us.component';
import { FooterComponent } from './shared/components/footer/footer.component';

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
        path:'footer',
        component:FooterComponent
    }




];
