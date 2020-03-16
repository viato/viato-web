import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { ScanService } from 'src/app/services/scan-service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, delay, tap } from 'rxjs/operators';
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

  constructor(
    private scanService: ScanService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.status = 'warning';
    this.isScanning.next(true);
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

}
