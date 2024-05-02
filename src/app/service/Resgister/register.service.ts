import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//seguindo o exemplo da Ju:
/* import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from "src/app/model/user.model";*/

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl = 'http://localhost:8585/api/v1/users';

  constructor(private http: HttpClient) { }

  // Método para criar um novo usuário
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Método para obter detalhes de um usuário específico
  getUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // Método para atualizar os detalhes de um usuário
  updateUser(userId: number, updatedUserData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, updatedUserData);
  }

  // Método para excluir um usuário
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }

  // service da Ju está assim:
  /*  validateLoginDetails(user: User) {
    window.sessionStorage.setItem("userdetails", JSON.stringify(user));
    return this.http.get(environment.rooturl + AppConstants.LOGIN_API_URL, {
      observe: 'response',
      withCredentials: true
    });
  }*/
}

