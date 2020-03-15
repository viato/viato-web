import { takeUntil, delay } from 'rxjs/operators';
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.scss']
})

// tslint:disable-next-line: angular-rxjs-takeuntil-before-subscribe (becuase we DO unsubscribe :D)
export class OauthCallbackComponent {
  private unsubscribe: Subject<void> = new Subject();

  constructor(private authService: NbAuthService, private router: Router, private userService: UserService) {
    userService.publishIsAuthenticating(true);
    this.router.navigateByUrl('/');
    this.authService.authenticate(this.resolveStrategy(router.url))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((authResult: NbAuthResult) => {
        if (authResult.isSuccess()) {
          this.router.navigateByUrl(authResult.getRedirect());
          this.userService.publishIsAuthenticating(false);
          this.unsubscribe.next();
          this.unsubscribe.complete();
        }
      });
  }

  resolveStrategy(url: string): string {
    switch (true) {
      case url.includes('google'):
        return 'google';
      case url.includes('facebook'):
        return 'facebook';
      default:
        break;
    }
  }
}
