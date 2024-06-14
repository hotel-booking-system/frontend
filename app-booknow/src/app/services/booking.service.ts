import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccommodationResponse } from '../models/accommodation/accommodation-response.model';

import { BookingRequest } from '../models/booking/booking-request.model';
import { BookingResponse } from '../models/booking/booking-response.mode';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'http://localhost:8080/booknow/bookings';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createBooking(bookingRequest: BookingRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToken()  // Adapte conforme o seu serviço de autenticação
    });

    return this.http.post<any>(this.apiUrl, bookingRequest, { headers: headers });
  }

  // buscar reserva por ID

  // listar reservad do usuário

  // editar reserva

  // excluir reserva

}
