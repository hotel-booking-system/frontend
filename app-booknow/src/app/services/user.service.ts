import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UpdatePasswordRequest } from '../models/user/update-password-request';
import { UpdateUserRequest } from '../models/user/update-user-request';
import { UserRequest } from '../models/user/user-request.model';
import { UserResponse } from '../models/user/user-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/booknow/users';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  registerUser(userRequest: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/register`, userRequest);
  }

  updateUser(updateUserRequest: UpdateUserRequest): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/update`, updateUserRequest, { headers });
  }

  updatePassword(updatePasswordRequest: UpdatePasswordRequest): Observable<string> {
    const headers = this.getAuthHeaders();
    return this.http.put<string>(`${this.apiUrl}/update-password`, updatePasswordRequest, { headers });
  }

  deactivateUser(token: string): Observable<void> {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.delete<void>(`${this.apiUrl}/delete`, { headers });
  }

  getMyDetails(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/me`, { headers });
  }

  becomeHost(): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.post<void>(`${this.apiUrl}/become-host`, {}, { headers });
  }

  isUserHost(): Observable<boolean> {
    const headers = this.getAuthHeaders();
    return this.http.get<boolean>(`${this.apiUrl}/is-host`, { headers });
  }

}
