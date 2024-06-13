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

  registerUser(userRequest: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/register`, userRequest);
  }

  updateUser(updateUserRequest: UpdateUserRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, updateUserRequest);
  }

  updatePassword(updatePasswordRequest: UpdatePasswordRequest): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update-password`, updatePasswordRequest);
  }

  deactivateUser(token: string): Observable<void> {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.delete<void>(`${this.apiUrl}/delete`, { headers });
  }

  getMyDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  becomeHost(token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.apiUrl}/become-host`, {}, { headers });
  }

  isUserHost(token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<boolean>(`${this.apiUrl}/is-host`, { headers });
  }

}
