import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AccommodationResponse } from 'src/app/models/accommodation/accommodation-response.model';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { AuthService } from 'src/app/services/auth.service';
import { AccommodationDetailsComponent } from '../accommodations/accommodation-details/accommodation-details.component';
import { BookingComponent } from '../booking/booking/booking.component';
import { DetailsModalComponent } from '../details-modal/details-modal.component';

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

  openDetailsModal(): void {
    const modalRef = this.modalService.open(AccommodationDetailsComponent, { centered: true });
    modalRef.componentInstance.accommodation = this.cardData;
  }

  /*
  openDetailsModal(): void {
    this.accommodationService.getAccommodationById(this.cardData.id).subscribe({
      next: (accommodation) => {
        this.selectedAccommodation = accommodation;
        const modalRef = this.modalService.open(DetailsModalComponent, { centered: true });
        modalRef.componentInstance.accommodation = accommodation;
      },
      error: err => {
        this.toastr.error('Erro ao carregar detalhes da acomodação.', 'Erro');
        console.error('Erro ao carregar detalhes da acomodação:', err);
      }
    });
  }*/

  bookingAccommodation(): void {
    const modalRef = this.modalService.open(BookingComponent, { size: 'lg' }); // 'lg' é o tamanho large, pode ser ajustado conforme necessário
    modalRef.componentInstance.accommodationId = this.cardData.id; // Passe os dados necessários para o componente do modal
  }


}
