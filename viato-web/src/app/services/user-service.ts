import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { NbAuthService, NbAuthOAuth2JWTToken, NbAuthOAuth2Token } from '@nebular/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  protected user$: BehaviorSubject<any> = new BehaviorSubject(null);

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

  onUserChange(): Observable<any> {
    return this.user$;
  }
}
