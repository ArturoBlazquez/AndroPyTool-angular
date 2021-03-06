import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Report} from '../../models/Report';
import {ReportService} from '../../services/report/report.service';
import {take} from 'rxjs/operators';
import {MyTitleService} from '../../services/title/my-title.service';

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
  showCorrupt = false;

  flowDroid: any;
  androPyTool: any;
  droidBox: any;
  strace: any;
  virusTotal: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly reportService: ReportService,
    private readonly title: MyTitleService
  ) {
    this.title.setTitle('report.title');
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
        } else if (error.status === 500) {
          this.showCorrupt = true;
        }
      }
    );
  }

  isBigScreen(): boolean {
    return window.innerWidth > 620;
  }

  suscribeToAnalyses(): void {
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

  firstLines(originalString: string, numLines: number): string {
    return originalString.split('\n', numLines).slice(0, numLines).join('\n');
  }

  downloadStraceAnalysis(): void {
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(this.strace);
    downloadLink.download = 'report_' + this.reportId + '_strace.csv';
    downloadLink.click();
  }
}
