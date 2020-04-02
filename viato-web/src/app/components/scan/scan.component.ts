import { Component, OnInit, OnDestroy} from '@angular/core';
import { ScanService } from 'src/app/services/scan-service';
import { TorTokenService, TorToken } from '../../services/tor-token-service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
})

export class ScanComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();

  status: string;
  isScanning = new BehaviorSubject<boolean>(false);
  contribution: any;
  error: string;
  tokenId?: string;

  constructor(
    private scanService: ScanService,
    private route: ActivatedRoute,
    private torTokenService: TorTokenService) { }

  ngOnInit(): void {
    this.status = 'warning';
    this.isScanning.next(true);
    this.route.params.subscribe(data => {
      const tor:string = data.tor;
      const token:TorToken = this.torTokenService.parseToken(tor);
      if (token) {
        this.showContributionPiplineBlock(token);
      }
    });

    this.scanService.scanTor(this.route.snapshot.params.tor)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((scanResult) => {
        this.contribution = scanResult.Contribution;
        this.status = 'success';
        this.isScanning.next(true);
      },
        (error) => {
          this.error = error;
          this.status = 'danger';
          this.isScanning.next(false);
        },
        () => {
          this.error = null;
          this.status = 'success';
          this.isScanning.next(false);
        });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  showContributionPiplineBlock(token: TorToken) {
    // TODO(aram): create contribtion pipline service which will return contribution pipline to show it to user
    this.tokenId = token.id;
  }

}
