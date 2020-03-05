import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NbAuthComponent } from '@nebular/auth';
import { ContributionComponent } from './components/contribution/contribution.component';


const routes: Routes = [{
  path: 'auth',
  component: NbAuthComponent,
  children: [
    {
      path: '',
      component: LoginComponent,
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
{ path: 'contribution', component: ContributionComponent, },
{ path: '', component: HomeComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
