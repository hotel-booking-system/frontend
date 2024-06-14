import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AccommodationResponse } from 'src/app/models/accommodation/accommodation-response.model';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() cardData!: AccommodationResponse;
  @Output() onEdit = new EventEmitter<number>();
  @Output() onViewDetails = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();

  isAuthenticated = false;
  hasUserPermission = false;
  isOwner = false;

  selectedAccommodation!: AccommodationResponse;

  constructor(
    private toastr: ToastrService,
    private accommodationService: AccommodationService,
    public authService: AuthService,
    private bookingService: BookingService,
    private modalService: NgbModal
  ) {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.hasUserPermission = this.authService.hasUserRole('ROLE_USER');
      this.isOwner = this.authService.hasUserRole('ROLE_OWNER');
    }
  }

  editCard(): void {
    this.onEdit.emit(this.cardData.id);
  }

  viewDetails(): void {
    this.onViewDetails.emit(this.cardData.id);
  }

  deleteCard(): void {
    if (confirm('Tem certeza de que deseja excluir esta acomodação?')) {
      this.accommodationService.deleteAccommodation(this.cardData.id).subscribe({
        next: () => {
          this.toastr.success('Acomodação excluída com sucesso!', 'Sucesso');
          this.onDelete.emit(this.cardData.id);
        },
        error: err => {
          this.toastr.error('Erro ao excluir acomodação.', 'Erro');
          console.error('Erro ao excluir acomodação:', err);
        }
      });
    }
  }

  bookingAccommodation() {
    this.bookingService.bookingAccommodation(this.cardData.id).subscribe({
      next: () => {
        this.toastr.success('Acomodação reservada com sucesso!', 'Sucesso');
      },
      error: err => {
        this.toastr.error('Erro ao reservar acomodação.', 'Erro');
        console.error('Erro ao reservar acomodação:', err);
      }
    });
  }

  openDetailsModal() {
    this.accommodationService.getAccommodationById(this.cardData.id).subscribe({
      next: (accommodation) => {
        this.selectedAccommodation = accommodation;
        this.modalService.open('detailsModal');
      },
      error: err => {
        this.toastr.error('Erro ao carregar detalhes da acomodação.', 'Erro');
        console.error('Erro ao carregar detalhes da acomodação:', err);
      }
    });
  }

}
