import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UploadComponent} from './pages/upload/upload.component';
import {ReportsComponent} from './pages/reports/reports.component';
import {ReportDetailComponent} from './pages/report-detail/report-detail.component';

const routes: Routes = [
  {path: '', component: UploadComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'reports/:reportId', component: ReportDetailComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
