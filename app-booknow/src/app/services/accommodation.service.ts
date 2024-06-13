import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccommodationRequest } from '../models/accommodation/accommodation-request.model';
import { AccommodationResponse } from '../models/accommodation/accommodation-response.model';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private baseUrl = 'http://localhost:8080/booknow/accommodations';

  constructor(private http: HttpClient) {}

  createAccommodation(accommodation: AccommodationRequest): Observable<AccommodationResponse> {
    return this.http.post<AccommodationResponse>(this.baseUrl, accommodation);
  }

  getAllAccommodations(): Observable<AccommodationResponse[]> {
    return this.http.get<AccommodationResponse[]>(`${this.baseUrl}/list`);
  }

  getAccommodationById(id: number): Observable<AccommodationResponse> {
    return this.http.get<AccommodationResponse>(`${this.baseUrl}/${id}`);
  }

  updateAccommodation(id: number, accommodationData: AccommodationRequest): Observable<AccommodationResponse> {
    return this.http.put<AccommodationResponse>(`${this.baseUrl}/${id}`, accommodationData);
  }

  deleteAccommodation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /*
    createAccommodation(accommodationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, accommodationData);
  }

  getAccommodationList(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getAccommodationById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateAccommodation(id: string, accommodationData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, accommodationData);
  }

  deleteAccommodation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getListPublicAccommodations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list`);
  }*/

}
