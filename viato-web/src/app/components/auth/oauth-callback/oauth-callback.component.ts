import { takeUntil } from 'rxjs/operators';
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.scss']
})
export class OauthCallbackComponent implements OnDestroy {
  private unsubscribe: Subject<void> = new Subject();

  constructor(private authService: NbAuthService, private router: Router) {
    this.authService.authenticate('google')
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((authResult: NbAuthResult) => {
        if (authResult.isSuccess()) {
          this.router.navigateByUrl(authResult.getRedirect());
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
