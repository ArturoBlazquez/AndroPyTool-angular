import {Component, OnInit} from '@angular/core';
import {ReportService} from '../../services/report/report.service';
import {Report} from '../../models/Report';
import {MyTitleService} from '../../services/title/my-title.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  reports: Report[];

  constructor(
    private readonly reportService: ReportService,
    private readonly title: MyTitleService
  ) {
    this.title.setTitle('allReports.title');
  }

  ngOnInit(): void {
    this.reportService.getAllReports().subscribe(report => {
      this.reports = report;
    });
  }

}
