import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserRequest } from '../models/user/user-request.model';
import { UserResponse } from '../models/user/user-response.model';

// serviços de autenticação
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/booknow/auth';
  private userRoles: string[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  signup(userRequest: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/signup`, userRequest);
  }

  // utiliza o operador tap para extrair os papéis (roles) do token JWT retornado pelo servidor após o login bem-sucedido.
  // Ele chama o método storeUserRoles para armazenar os papéis no serviço.
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        this.setToken(response.token);
        this.storeUserRoles(response.roles);
      })
    );
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  removeToken(): void {
    sessionStorage.removeItem('token');
  }

  redirectToHome(): void {
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }

  // retorna os papéis armazenados no serviço
  getUserRoles(): string[] {
    return this.userRoles;
  }

  private storeUserRoles(roles: string[]): void {
    this.userRoles = roles;
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.userRoles = [];
  }

}
