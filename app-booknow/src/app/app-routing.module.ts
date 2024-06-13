import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccommodationFormComponent } from './components/accommodations/accommodation-form/accommodation-form.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UpdatePasswordComponent } from './components/auth/update-password/update-password.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterUserComponent } from './components/users/register-user/register-user.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { authGuard } from './guard/auth.guard';
import { AccommodationDetailsComponent } from './components/accommodations/accommodation-details/accommodation-details.component';
import { ResetPasswordComponent } from './components/password/reset-password/reset-password.component';
import { BecomeHostComponent } from './components/become-host/become-host.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'register', component: RegisterUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ResetPasswordComponent },

  { path: 'users/update', component: UpdateUserComponent, canActivate: [authGuard] },
  { path: 'users/update-password', component: UpdatePasswordComponent, canActivate: [authGuard] },

  { path: 'accommodations/register', component: AccommodationFormComponent, canActivate: [authGuard] },
  { path: 'accommodation/edit/:id', component: AccommodationFormComponent, canActivate: [authGuard] },
  { path: 'accommodation/:id/details', component: AccommodationDetailsComponent, canActivate: [authGuard] },

  { path: 'become-host', component: BecomeHostComponent, canActivate: [authGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
