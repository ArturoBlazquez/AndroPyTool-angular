import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Report} from '../models/Report';
import {environment} from '../../environments/environment';
import {catchError, map, retry, tap} from 'rxjs/operators';
import {ReportsResponse} from '../models/ReportsResponse';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  public getAllReports(): Observable<Report[]> {
    return this.httpClient.get<ReportsResponse>(environment.restApiUrl + 'reports').pipe(
      map(reportsResponse => {
        return reportsResponse.all_reports;
      }),
    );
  }

  public getReportDetail(id: string): Observable<Report> {
    return this.httpClient.get<Report>(environment.restApiUrl + 'reports/' + id).pipe(
      retry(1),
      catchError(error => {
        if (error.status === 404) {
          console.log(error);
          return throwError(error);
        }
      }),
      tap(report => {
        if ('error' in report) {
          throw new HttpErrorResponse({error: report, status: 200});
        }
      }),
    );
  }
}
