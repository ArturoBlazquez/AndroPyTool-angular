import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Report} from '../../models/Report';
import {ReportService} from '../../services/report.service';
import {take} from 'rxjs/operators';

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

  firstPanelOpen = true;
  secondPanelOpen = true;

  flowDroid: any;
  androPyTool: any;
  droidBox: any;
  strace: any;
  virusTotal: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly reportService: ReportService
  ) {
  }

  ngOnInit(): void {
    this.reportId = this.route.snapshot.params.reportId;
    this.reportService.getReportDetail(this.reportId).pipe(take(1)).subscribe(
      report => {
        this.report = report;
        this.suscribeToAnalyses();
      },
      error => {
        this.report = null;
        if (error.status === 404) {
          this.show404 = true;
        } else if (error.status === 200) {
          this.showInvalid = true;
        }
      }
    );
  }

  private suscribeToAnalyses(): void {
    this.reportService.getFlowDroid(this.reportId).pipe(take(1)).subscribe(
      report => {
        this.flowDroid = report;
      }
    );

    this.reportService.getAndroPyTool(this.reportId).pipe(take(1)).subscribe(
      report => {
        this.androPyTool = report;
      }
    );

    this.reportService.getDroidBox(this.reportId).pipe(take(1)).subscribe(
      report => {
        this.droidBox = report;
      }
    );

    this.reportService.getStrace(this.reportId).pipe(take(1)).subscribe(
      report => {
        this.strace = report;
      }
    );

    this.reportService.getVirusTotal(this.reportId).pipe(take(1)).subscribe(
      report => {
        this.virusTotal = report;
      }
    );
  }
}
