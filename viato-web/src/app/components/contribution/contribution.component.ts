import { Contribution } from './../../models/contribution';
import { Component, OnInit } from '@angular/core';
import { NbListComponent } from '@nebular/theme';
import { ContributionService } from 'src/app/services/contribution-service';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.scss'],
})
export class ContributionComponent implements OnInit {

  contributions: Contribution[];

  constructor(private contributionService: ContributionService) {
  }

  ngOnInit(): void {
    this.getContributions();
  }

  getContributions(): void {
    this.contributionService
    .getContributions()
    .subscribe(contributions => this.contributions = contributions);
  }
}
