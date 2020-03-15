import {
  NbOAuth2AuthStrategy,
  NbAuthResult,
  NbOAuth2GrantType,
  NbAuthOAuth2Token,
  nbAuthCreateToken,
  NbAuthToken,
  NbAuthIllegalTokenError
} from '@nebular/auth';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of as observableOf, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

export abstract class MixedOAuth2Strategy extends NbOAuth2AuthStrategy {

  authenticate(data?: any): Observable<NbAuthResult> {
    if (this.getOption('token.grantType') === NbOAuth2GrantType.PASSWORD) {
      return this.passwordToken(data.email, data.password);
    } else {
      return this.isRedirectResult()
        .pipe(
          switchMap((result: boolean) => {
            if (!result) {
              this.authorizeRedirect();
              return observableOf(new NbAuthResult(true));
            }
            return this.getAuthorizationResult()
              .pipe(
                switchMap((authResult: NbAuthResult) => {
                  if (authResult.isSuccess()) {
                    return this.getInternalToken(authResult.getToken() as NbAuthOAuth2Token);
                  } else {
                    return of(authResult);
                  }
                })
              );
          }),
        );
    }
  }

  getInternalToken(token: NbAuthOAuth2Token): Observable<NbAuthResult> {
    const module = 'token';
    const url = this.getActionEndpoint(module);
    const requireValidToken = this.getOption(`${module}.requireValidToken`);

    let headers = this.buildAuthHeader() || new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(url, this.buildTokenRequestData(token.getValue()), { headers })
      .pipe(
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption('redirect.success'),
            [],
            this.getOption('defaultMessages'),
            this.createInternalToken(res, requireValidToken));
        }),
        catchError((res) => this.handleResponseError(res)),
      );
  }

  createInternalToken<T extends NbAuthToken>(value: any, failWhenInvalidToken?: boolean): T {
    const token = nbAuthCreateToken<T>(this.getOption('internal.tokenClass'), value, this.getName());
    if (failWhenInvalidToken && !token.isValid()) {
      throw new NbAuthIllegalTokenError('Token is empty or invalid.');
    }
    return token;
  }

  protected buildTokenRequestData(externalToken: string): string {
    const params = {
      grant_type: this.getOption('token.grantType'),
      scope: this.getOption('token.scope'),
      provider: this.getOption('internal.provider'),
      external_token: externalToken,
    };
    return this.urlEncodeParameters(this.cleanParams(this.addCredentialsToParams(params)));
  }

  protected buildAuthHeader(): any {
    if (this.getOption('internal.clientId') && this.getOption('internal.clientSecret')) {
      return new HttpHeaders(
        {
          Authorization: 'Basic ' + btoa(
            this.getOption('internal.clientId') + ':' + this.getOption('internal.clientSecret')),
        },
      );
    } else {
      throw Error('For basic client authentication method, please provide both clientId & clientSecret.');
    }
  }
}
