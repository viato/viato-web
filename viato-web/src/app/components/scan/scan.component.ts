import { Component, OnInit, OnDestroy} from '@angular/core';
import { ScanService } from 'src/app/services/scan-service';
import { TorTokenService, TorToken } from '../../services/tor-token-service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { ContributionPipelineService } from 'src/app/services/contribution-pipeline-service';
import { ContributionPipeline } from 'src/app/interfaces/contribution-pipeline';
import { Contribution } from 'src/app/interfaces/contribution';

@Component({
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
})

export class ScanComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();

  status$ = new BehaviorSubject<string>('warning');
  isLoading$ = new BehaviorSubject<boolean>(false);
  spinnerMessage$ = new BehaviorSubject<string>('');
  contribution$ = new BehaviorSubject<Contribution>(undefined);
  pipeline$ = new BehaviorSubject<ContributionPipeline>(undefined);
  error$ = new BehaviorSubject<string>(undefined);
  token$ = new BehaviorSubject<TorToken>(undefined);

  constructor(
    private pipelineService: ContributionPipelineService,
    private route: ActivatedRoute,
    private torTokenService: TorTokenService) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      const tor: string = data.tor;
      const token: TorToken = this.torTokenService.parseToken(tor);
      if (token) {
        this.showContributionPiplineBlock(token);
      } else {
        this.showError('Failed to parse your contribution token.');
      }
    });

    // this.isScanning.next(true);
    // this.scanService.scanTor(this.route.snapshot.params.tor)
    //   .pipe(takeUntil(this.unsubscribe))
    //   .subscribe((scanResult) => {
    //     this.contribution = scanResult.Contribution;
    //     this.status = 'success';
    //     this.isScanning.next(true);
    //   },
    //     (error) => {
    //       this.error = error;
    //       this.status = 'danger';
    //       this.isScanning.next(false);
    //     },
    //     () => {
    //       this.error = null;
    //       this.status = 'success';
    //       this.isScanning.next(false);
    //     });
    // We are processing your contribution, right now!
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  showError(message: string) {
    this.error$.next(message);
    this.status$.next('danger');
    this.isLoading$.next(false);
  }

  showContributionPiplineBlock(token: TorToken) {
    this.spinnerMessage$.next("Loading contribution pipeline!");
    this.isLoading$.next(true);
    this.pipelineService.getContributionPipelineById(token.pipelineId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(value => {
        this.token$.next(token);
        this.pipeline$.next(value);
        this.isLoading$.next(false);
      }, () => {
        this.showError('Failed to process your contribution.');
      });
  }

}
