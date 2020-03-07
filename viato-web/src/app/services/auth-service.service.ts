import { NbAuthService, NbTokenService, NB_AUTH_STRATEGIES, NbAuthResult } from '@nebular/auth';
import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService extends NbAuthService {

  constructor(
    tokenService: NbTokenService,
    @Inject(NB_AUTH_STRATEGIES) strategies) {
    super(tokenService, strategies);
  }

  logout(strategyName: string) {
    this.getStrategy(strategyName).logout()
      .subscribe((result: NbAuthResult) => {
        if (result.isSuccess()) {
          this.tokenService.clear();
        }
        return of(result);
      });

    return of(new NbAuthResult(true));
  }


}
