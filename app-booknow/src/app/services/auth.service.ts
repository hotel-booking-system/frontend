import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/user/login-response.model';
import { UserRequest } from '../models/user/user-request.model';
import { UserResponse } from '../models/user/user-response.model';

// serviços de autenticação
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/booknow/auth';

  constructor(private http: HttpClient, private router: Router) { }

  signup(userRequest: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/signup`, userRequest);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  // Método para armazenar o token no sessionStorage
  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  // Método para obter o token do sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Método para remover o token do sessionStorage ao fazer logout
  removeToken(): void {
    sessionStorage.removeItem('token');
  }

  // Método para redirecionar para a página de destino após o login bem-sucedido
  redirectToHome(): void {
    this.router.navigate(['/home']);
  }

  getAuthenticatedUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }

}
