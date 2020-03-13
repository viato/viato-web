import { Injectable } from '@angular/core';
import { NbOAuth2AuthStrategy, NbOAuth2AuthStrategyOptions, NbAuthStrategyClass } from '@nebular/auth';

@Injectable()
export class NbGoogleOAuth2Strategy extends NbOAuth2AuthStrategy {
  static setup(options: NbOAuth2AuthStrategyOptions): [NbAuthStrategyClass, NbOAuth2AuthStrategyOptions] {
    return [NbGoogleOAuth2Strategy, options];
  }
}
