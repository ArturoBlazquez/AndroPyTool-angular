import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Report} from '../../models/Report';
import {environment} from '../../../environments/environment';
import {catchError, map, retry, tap} from 'rxjs/operators';
import {ReportsResponse} from '../../models/ReportsResponse';

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

  public getFlowDroid(id: string): Observable<any> {
    return this.httpClient.get(environment.restApiUrl + 'reports/' + id + '/static/flowdroid')
      .pipe(retry(1));
  }

  public getAndroPyTool(id: string): Observable<any> {
    return this.httpClient.get(environment.restApiUrl + 'reports/' + id + '/static/andropytool')
      .pipe(retry(1));
  }

  public getDroidBox(id: string): Observable<any> {
    return this.httpClient.get(environment.restApiUrl + 'reports/' + id + '/dynamic/droidbox')
      .pipe(retry(1));
  }

  public getStrace(id: string): Observable<any> {
    return this.httpClient.get(environment.restApiUrl + 'reports/' + id + '/dynamic/strace', {responseType: 'text'})
      .pipe(retry(1));
  }

  public getVirusTotal(id: string): Observable<any> {
    return this.httpClient.get(environment.restApiUrl + 'reports/' + id + '/virustotal', {responseType: 'text'})
      .pipe(retry(1));
  }

  public getCompleteReport(id: string): Observable<any> {
    return this.httpClient.get(environment.restApiUrl + 'reports/' + id + '/complete')
      .pipe(retry(1));
  }
}
