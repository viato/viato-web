import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  constructor(private authService: NbAuthService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  login(strategy: string) {
    this.authService.authenticate(strategy)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((authResult: NbAuthResult) => {
      });
  }
}
