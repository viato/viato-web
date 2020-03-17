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
      switch (error.status) {
        case 400:
          errorMessage = `Invalid Tor Token was provided, please scan again.`;
          break;
        case 441:
          errorMessage = `Contribution Pipeline you are trying to contribute, no longer exists.`;
          break;
        case 442:
          errorMessage = `Contribution Pipeline you are trying to contribute is not active right now.`;
          break;
        case 443:
          errorMessage = `Organization who is running this pipeline didn't pass verification.`;
          break;
        default:
          errorMessage = `Oops, something unexpected happened, please try again later.`;
          break;
      };
    }
    return throwError(errorMessage);
  }
}
