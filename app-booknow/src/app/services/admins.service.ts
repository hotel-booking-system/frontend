import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  private apiUrl = 'http://localhost:8080/booknow/admins';

  constructor(private http: HttpClient) { }

  createAdmin(adminData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-admin`, adminData);
  }

}
