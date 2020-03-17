import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbAlertModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbButtonModule,
  NbListModule,
  NbUserModule,
  NbActionsModule,
  NbContextMenuModule,
  NbSearchModule,
  NbMenuModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbStepperModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';
import {
  NbOAuth2AuthStrategy,
  NbAuthModule,
  NbOAuth2GrantType,
  NbAuthOAuth2Token,
  NbAuthOAuth2JWTToken,
  NbOAuth2ClientAuthMethod,
  NbPasswordAuthStrategy,
  NbOAuth2ResponseType
} from '@nebular/auth';
import { HomeComponent } from './components/home/home.component';
import { ContributionComponent } from './components/contribution/contribution.component';
import { ScanComponent } from './components/scan/scan.component';
import { AuthWrapperComponent } from './components/auth/auth-wrapper/auth-wrapper.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { NbSecurityModule } from '@nebular/security';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { GoogleMixedOAuth2Strategy } from './components/auth/strategies/GoogleMixedOAuth2Strategy';
import { OauthCallbackComponent } from './components/auth/oauth-callback/oauth-callback.component';
import { FbMixedOAuth2Strategy } from './components/auth/strategies/FbMixedOAuth2Strategy';
import { environment } from 'src/environments/environment';

export const NB_CORE_PROVIDERS = [
  ...NbAuthModule.forRoot({
    strategies: [
      NbOAuth2AuthStrategy.setup({
        name: 'oauth2',
        clientId: 'viato-web-ui',
        clientSecret: 'viato-web-ui',
        clientAuthMethod: NbOAuth2ClientAuthMethod.BASIC,
        baseEndpoint: environment.apiUrl,
        token: {
          endpoint: '/connect/token',
          scope: 'api',
          class: NbAuthOAuth2JWTToken,
          grantType: NbOAuth2GrantType.PASSWORD,
          requireValidToken: true,
        },
      }),
      GoogleMixedOAuth2Strategy.setup({
        name: 'google',
        clientId: '647756271888-tcmp1aj2ulmqqcrpd4ad13k3fpagmh3o.apps.googleusercontent.com',
        authorize: {
          endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
          responseType: NbOAuth2ResponseType.TOKEN,
          scope: 'email profile',
          redirectUri: environment.uiUrl + '/auth/callback/' + 'google',
        },
        token: {
          class: NbAuthOAuth2Token,
          endpoint: environment.apiUrl + '/connect/token',
          scope: 'api',
          grantType: 'external',
        },
        internal: {
          clientId: 'viato-web-ui',
          clientSecret: 'viato-web-ui',
          provider: 'google',
          tokenClass: NbAuthOAuth2JWTToken,
        }
      }),
      FbMixedOAuth2Strategy.setup({
        name: 'facebook',
        clientId: '213822853333063',
        authorize: {
          endpoint: 'https://www.facebook.com/v6.0/dialog/oauth',
          responseType: NbOAuth2ResponseType.TOKEN,
          redirectUri: environment.uiUrl + '/auth/callback/' + 'facebook',
          scope: 'email'
        },
        token: {
          class: NbAuthOAuth2Token,
          endpoint: environment.apiUrl + '/connect/token',
          scope: 'api',
          grantType: 'external',
        },
        internal: {
          clientId: 'viato-web-ui',
          clientSecret: 'viato-web-ui',
          provider: 'facebook',
          tokenClass: NbAuthOAuth2JWTToken,
        }
      }),
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: environment.apiUrl,
        register: {
          endpoint: '/auth/register',
        },
        resetPass: {
          endpoint: '/auth/reset-password',
        },
        requestPass: {
          endpoint: '/auth/forgot-password',
        },
      }),
    ],
    forms: {
      login: {
        strategy: 'oauth2'
      },
      register: {
        strategy: 'email'
      },
      logout: {
        strategy: 'oauth2'
      },
      validation: {
        password: {
          required: true,
          pattern: new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
        },
        email: {
          required: true,
        },
        fullName: {
          required: false,
          minLength: 8,
          maxLength: 50,
        },
      },
    }
  }).providers,
  GoogleMixedOAuth2Strategy,
  FbMixedOAuth2Strategy,
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    HomeComponent,
    RegisterComponent,
    ContributionComponent,
    ScanComponent,
    AuthWrapperComponent,
    LayoutComponent,
    HeaderComponent,
    AboutUsComponent,
    NotFoundComponent,
    OauthCallbackComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    HttpClientModule,
    NbAuthModule,
    NbCardModule,
    NbAlertModule,
    NbCheckboxModule,
    NbIconModule,
    FormsModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    NbListModule,
    NbUserModule,
    NbActionsModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NbSearchModule,
    NbSecurityModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbSpinnerModule,
    NbStepperModule,
  ],
  providers: [
    ...NB_CORE_PROVIDERS,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
