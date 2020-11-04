import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  public postFile(file: File, virusTotalAPIKey: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    if (virusTotalAPIKey === '') {
      return this.httpClient.post(environment.restApiUrl + 'files', formData, { observe: 'response' }).pipe(
        catchError(error => {
          console.log(error);
          return throwError(error);
        }),
      );
    } else {
      return this.httpClient.post(environment.restApiUrl + 'files?virus_total_api_key=' + virusTotalAPIKey, formData, { observe: 'response' }).pipe(
        catchError(error => {
          console.log(error);
          return throwError(error);
        }),
      );
    }
  }
}
