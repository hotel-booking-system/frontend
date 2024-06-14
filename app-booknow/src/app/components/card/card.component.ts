import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccommodationResponse } from 'src/app/models/accommodation/accommodation-response.model';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    private toastr: ToastrService,
    private accommodationService: AccommodationService,
    private authService: AuthService
  ) {}

  // Este método verifica se os papéis do usuário contêm o papel específico 
  hasUserRole(role: string): boolean {
    return this.authService.getUserRoles().includes(`ROLE_${role}`);
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
}
