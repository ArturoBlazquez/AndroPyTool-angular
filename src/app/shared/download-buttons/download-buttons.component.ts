import {Component, Input, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';
import {ReportService} from '../../services/report/report.service';

@Component({
  selector: 'app-download-buttons',
  templateUrl: './download-buttons.component.html',
  styleUrls: ['./download-buttons.component.scss']
})
export class DownloadButtonsComponent implements OnInit {
  @Input() reportId: string;

  constructor(
    private readonly reportService: ReportService
  ) { }

  ngOnInit(): void {
  }

  downloadAnalysis(): void {
    this.reportService.getCompleteReport(this.reportId).pipe(take(1)).subscribe(
      report => {
        const downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
        downloadLink.download = 'report_' + this.reportId + '.json';
        downloadLink.click();
      }
    );
  }
}
