import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { PartiesComponent } from './parties/parties.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path: 'candidato',
    component: CandidatesComponent,
  },
  {
    path: 'partido',
    component: PartiesComponent,
  },
  {
    path: 'mesa',
    component: TableComponent,
  },
  {
    path: 'general',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
