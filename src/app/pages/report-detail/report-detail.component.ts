import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Report} from '../../models/Report';
import {ReportService} from '../../services/report.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit {
  reportId: string;
  report: Report;
  show404 = false;
  showInvalid = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly reportService: ReportService
  ) {
  }

  ngOnInit(): void {
    this.reportId = this.route.snapshot.params.reportId;
    this.reportService.getReportDetail(this.reportId).subscribe(
      report => {
        this.report = report;
      },
      error => {
        this.report = null;
        if (error.status === 404) {
          this.show404 = true;
        } else if (error.status === 200){
          this.showInvalid = true;
        }
      }
    );
  }

}
