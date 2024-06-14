import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AccommodationDetailsComponent,
} from './components/accommodations/accommodation-details/accommodation-details.component';
import { AccommodationFormComponent } from './components/accommodations/accommodation-form/accommodation-form.component';
import { AccommodationListComponent } from './components/accommodations/accommodation-list/accommodation-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UpdatePasswordComponent } from './components/auth/update-password/update-password.component';
import { BecomeHostComponent } from './components/become-host/become-host.component';
import { CardComponent } from './components/card/card.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotificationComponent } from './components/notification/notification.component';
import {
  ConfirmResetPasswordComponent,
} from './components/password/confirm-reset-password/confirm-reset-password.component';
import { ResetPasswordComponent } from './components/password/reset-password/reset-password.component';
import { RegisterUserComponent } from './components/users/register-user/register-user.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AccommodationService } from './services/accommodation.service';
import { AdminsService } from './services/admins.service';
import { AuthService } from './services/auth.service';
import { BookingService } from './services/booking.service';
import { DataService } from './services/data.service';
import { NotificationService } from './services/notification.service';
import { PasswordService } from './services/password.service';
import { UserService } from './services/user.service';
import { BookingComponent } from './components/booking/booking/booking.component';

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
    BecomeHostComponent,
    AccommodationListComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // formulários reativos
    HttpClientModule, // realizar requisições HTTP
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    NgbModule,
    ToastrModule.forRoot({ // ToastrModule globalmente
      positionClass: 'toast-top-right', // Posição das mensagens
      preventDuplicates: true, // Evitar mensagens duplicadas
      closeButton: true // Botão de fechar
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          // Define como obter o token JWT (pode ser sessionStorage, localStorage, etc)
          return sessionStorage.getItem('jwtToken');
        },
        //allowedDomains: ['example.com'], // Domínios permitidos para o token (opcional)
        //disallowedRoutes: ['http://example.com/examplebadroute/'], // Rotas desativadas para o token (opcional)
      }
    })
  ],
  providers: [
    // Serviços, provedores etc.
    AccommodationService,
    AdminsService,
    AuthService,
    BookingService,
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
