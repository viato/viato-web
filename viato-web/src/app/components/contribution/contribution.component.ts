import { Contribution } from './../../interfaces/contribution';
import { Component, OnInit } from '@angular/core';
import { ContributionService } from 'src/app/services/contribution-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.scss'],
})
export class ContributionComponent implements OnInit {

  constructor(private contributionService: ContributionService) {
  }
  ngOnInit(): void {
  }

  getContributions(): Observable<Contribution[]> {
    return this.contributionService.getContributions();
  }
}
