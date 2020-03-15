import { NbOAuth2AuthStrategyOptions, NbAuthTokenClass } from '@nebular/auth';

export declare class MixedOAuth2StrategyOptions extends NbOAuth2AuthStrategyOptions {
  baseEndpoint?: string;
  clientId: string;
  clientSecret?: string;
  clientAuthMethod?: string;
  redirect?: {
      success?: string;
      failure?: string;
  };
  defaultErrors?: any[];
  defaultMessages?: any[];
  authorize?: {
      endpoint?: string;
      redirectUri?: string;
      responseType?: string;
      requireValidToken?: boolean;
      scope?: string;
      state?: string;
      params?: {
          [key: string]: string;
      };
  };
  token?: {
      endpoint?: string;
      grantType?: string;
      redirectUri?: string;
      scope?: string;
      requireValidToken?: boolean;
      class: NbAuthTokenClass;
  };
  refresh?: {
      endpoint?: string;
      grantType?: string;
      scope?: string;
      requireValidToken?: boolean;
  };
  internal: {
    clientId: string;
    clientSecret?: string;
    provider: string;
    tokenClass: NbAuthTokenClass;
  };
}

export const mixedOAuth2StrategyOptions: MixedOAuth2StrategyOptions = new MixedOAuth2StrategyOptions();
