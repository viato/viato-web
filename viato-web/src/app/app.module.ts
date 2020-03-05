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
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import {
  NbOAuth2AuthStrategy,
  NbAuthModule,
  NbOAuth2GrantType,
  NbAuthOAuth2Token,
  NbOAuth2ClientAuthMethod,
  NbPasswordAuthStrategy
} from '@nebular/auth';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ContributionComponent } from './components/contribution/contribution.component';

export const NB_CORE_PROVIDERS = [
  ...NbAuthModule.forRoot({
    strategies: [
      NbOAuth2AuthStrategy.setup({
        name: 'oauth2',
        clientId: 'viato-web-ui',
        clientSecret: 'viato-web-ui',
        clientAuthMethod: NbOAuth2ClientAuthMethod.BASIC,
        baseEndpoint: 'https://localhost:5000',
        token: {
          endpoint: '/connect/token',
          scope: 'api',
          class: NbAuthOAuth2Token,
          grantType: NbOAuth2GrantType.PASSWORD,
        },

      }),
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: 'https://localhost:5000',
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
  }).providers,
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ContributionComponent
  ],
  imports: [
    BrowserModule,
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
  ],
  providers: [
    ...NB_CORE_PROVIDERS,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
