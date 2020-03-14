import { Injectable } from '@angular/core';
import { NbAuthStrategyClass } from '@nebular/auth';
import { MixedOAuth2StrategyOptions } from './MixedOAuth2StrategyOptions';
import { MixedOAuth2Strategy } from './MixedOAuth2Strategy';

@Injectable()
export class GoogleMixedOAuth2Strategy extends MixedOAuth2Strategy {
  static setup(options: MixedOAuth2StrategyOptions): [NbAuthStrategyClass, MixedOAuth2StrategyOptions] {
    return [GoogleMixedOAuth2Strategy, options];
  }
}
