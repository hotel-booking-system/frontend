import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashHotelComponent } from './components/dash-hotel/dash-hotel.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'}, // 
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashHotel', component: DashHotelComponent },
  // ... outras rotas
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
