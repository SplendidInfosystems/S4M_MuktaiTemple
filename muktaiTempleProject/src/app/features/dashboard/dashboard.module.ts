import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutComponent,
  ]
})
export class DashboardModule { }
