import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { CandidatesComponent } from './candidates/candidates.component';
import { TableComponent } from './table/table.component';
import { PartiesComponent } from './parties/parties.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    CandidatesComponent,
    TableComponent,
    PartiesComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
