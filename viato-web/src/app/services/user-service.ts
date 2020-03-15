import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { NbAuthService, NbAuthOAuth2JWTToken, NbAuthOAuth2Token } from '@nebular/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  protected user$: BehaviorSubject<any> = new BehaviorSubject(null);
  protected isAuthenticating$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private authService: NbAuthService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthOAuth2JWTToken) => {
        if (token.isValid()) {
          this.publishUser(token.getAccessTokenPayload());
        }
      });
  }

  private publishUser(user: any) {
    this.user$.next(user);
  }

  public publishIsAuthenticating(isAuthenticating: boolean) {
    this.isAuthenticating$.next(isAuthenticating);
  }

  onUserChange(): Observable<any> {
    return this.user$;
  }

  onIsAuthenticatingChange(): Observable<boolean> {
    return this.isAuthenticating$;
  }
}
