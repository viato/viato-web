import { Observable, BehaviorSubject, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, map, delay } from 'rxjs/operators';

import { NbAuthService, } from '@nebular/auth';
import { environment } from 'src/environments/environment';
import { Contribution } from '../interfaces/contribution';

@Injectable({
  providedIn: 'root',
})
export class ScanService {
  protected contribution$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private authService: NbAuthService,
    private http: HttpClient) {
  }

  scanTor(token: string): Observable<Contribution> {
    return this.http.post<Contribution>(`${environment.apiUrl}/contributions/scan-tor`, { TorToken: token });
  }
}
