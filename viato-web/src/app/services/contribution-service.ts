import { Contribution } from './../models/contribution';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of, from } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ContributionService {
  constructor(private http: HttpClient) { }

  getContributions(): Observable<Contribution[]> {
    // return this.http.get<Contribution[]>('/a/a')
    //   .pipe(
    //   );
    return of([({
      amount: 100,
      id: 1,
      contributionPipelineId: 2,
      contributionDate: new Date(),
    }) as Contribution, ({
      amount: 200,
      contributionDate: new Date(),
      id: 1,
      contributionPipelineId: 2,
    }) as Contribution]);
  }
}
