import { OauthCallbackComponent } from './components/auth/oauth-callback/oauth-callback.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthWrapperComponent } from './components/auth/auth-wrapper/auth-wrapper.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { NbAuthComponent } from '@nebular/auth';
import { ContributionComponent } from './components/contribution/contribution.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'contribution', component: ContributionComponent, },
      { path: '', component: HomeComponent, },
      { path: 'about-us', component: AboutUsComponent, }
    ]
  }, {
    path: 'auth',
    component: AuthWrapperComponent,
    children: [
      {
        path: '',
        component: SignInComponent,
      },
      {
        path: 'callback',
        component: OauthCallbackComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
