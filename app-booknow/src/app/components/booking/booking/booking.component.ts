import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  bookingForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      accommodationId: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      numGuests: [1, [Validators.required, Validators.min(1), Validators.max(50)]]
    });
  }

  onSubmit() {
    if (this.bookingForm.invalid) {
      return;
    }

    this.bookingService.createBooking(this.bookingForm.value).subscribe({
      next: response => {
        console.log('Reserva criada com sucesso:', response);
        // Aqui você pode redirecionar para uma página de sucesso ou fazer outra ação necessária
      },
      error: error => {
        console.error('Erro ao criar reserva:', error);
      }
    });
  }

  closeModal() {
    this.activeModal.dismiss('Cross click'); // Fecha o modal com uma mensagem opcional
  }

}
