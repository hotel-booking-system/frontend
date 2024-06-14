import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'http://localhost:8080/booknow/bookings';

  constructor(private http: HttpClient) { }

  reserveAccommodation(booking: Booking): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, booking);
  }

  getAccommodationById(accommodationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/accommodations/${accommodationId}`);
  }

  bookingAccommodation(accommodationId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reserve`, { accommodationId });
  }

}
