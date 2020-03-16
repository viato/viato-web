import { Observable, BehaviorSubject, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, map, delay } from 'rxjs/operators';

import { NbAuthService, } from '@nebular/auth';
import { environment } from 'src/environments/environment';

class ScanResult {
  StagedContributionId: string;
  Contribution: any;
}

@Injectable({
  providedIn: 'root',
})
export class ScanService {
  protected contribution$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private authService: NbAuthService,
    private http: HttpClient) {
  }

  scanTor(token: string): Observable<ScanResult> {
    return this.http.post<ScanResult>(`${environment.apiUrl}/contributions/scan-tor`, { TorToken: token })
      .pipe(
        retry(5),
        catchError(this.handleError),
      );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
}
}
