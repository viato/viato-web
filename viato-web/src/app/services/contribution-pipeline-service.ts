import { Observable, BehaviorSubject, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, map, delay } from 'rxjs/operators';
import { NbAuthService, } from '@nebular/auth';
import { environment } from 'src/environments/environment';
import { ContributionPipeline } from '../interfaces/contribution-pipeline';

@Injectable({
  providedIn: 'root',
})
export class ContributionPipelineService {

  constructor(
    private http: HttpClient) {
  }

  getContributionPipelineById(id: string): Observable<ContributionPipeline>|undefined {
    if (!id) return;
    return this.http.get<ContributionPipeline>(`${environment.apiUrl}/pipelines/${id}`);
  }
}
