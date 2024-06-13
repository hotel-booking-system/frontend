import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdatePasswordRequest } from '../models/user/update-password-request';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private apiUrl = 'http://localhost:8080/booknow/password';

  constructor(private http: HttpClient) { }

  updatePassword(updatePasswordRequest: UpdatePasswordRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-password`, updatePasswordRequest);
  }

  resetPassword(email: string): Observable<string> {
    const url = `${this.apiUrl}/reset-password`;
    return this.http.post<string>(url, { email });
  }

  confirmResetPassword(token: string, resetPasswordRequest: { newPassword: string; confirmPassword: string }): Observable<any> {
    const url = `${this.apiUrl}/reset-password/confirm?token=${token}`;
    return this.http.post(url, resetPasswordRequest, { responseType: 'text' });
  }

}
