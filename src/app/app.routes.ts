import { Routes } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './shared/components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path:'home',
        component:HomeComponent

    },


    {
        path: 'header',
        component: HeaderComponent
    },

];
