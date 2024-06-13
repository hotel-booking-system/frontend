import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AccommodationDetailsComponent,
} from './components/accommodations/accommodation-details/accommodation-details.component';
import { AccommodationFormComponent } from './components/accommodations/accommodation-form/accommodation-form.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UpdatePasswordComponent } from './components/auth/update-password/update-password.component';
import { CardComponent } from './components/card/card.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ResetPasswordComponent } from './components/password/reset-password/reset-password.component';
import { RegisterUserComponent } from './components/users/register-user/register-user.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AccommodationService } from './services/accommodation.service';
import { AdminsService } from './services/admins.service';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { NotificationService } from './services/notification.service';
import { PasswordService } from './services/password.service';
import { UserService } from './services/user.service';
import { ConfirmResetPasswordComponent } from './components/password/confirm-reset-password/confirm-reset-password.component';
import { BecomeHostComponent } from './components/become-host/become-host.component';

@NgModule({
  declarations: [
    // Componentes, diretivas etc.
    AppComponent,
    RegisterUserComponent,
    LoginComponent,
    HomeComponent,
    UpdateUserComponent,
    NavBarComponent,
    UpdatePasswordComponent,
    NotificationComponent,
    CardComponent,
    AccommodationFormComponent,
    AccommodationDetailsComponent,
    ResetPasswordComponent,
    ConfirmResetPasswordComponent,
    BecomeHostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // Importa ReactiveFormsModule para formulários reativos
    HttpClientModule, // Importa HttpClientModule para realizar requisições HTTP
    FormsModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [
    // Serviços, provedores etc.
    AccommodationService,
    AdminsService,
    AuthService,
    DataService,
    NotificationService,
    PasswordService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
