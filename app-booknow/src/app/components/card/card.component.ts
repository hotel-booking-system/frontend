import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccommodationResponse } from 'src/app/models/accommodation/accommodation-response.model';

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

  editCard(): void {
    this.onEdit.emit(this.cardData.id);
  }

  viewDetails(): void {
    this.onViewDetails.emit(this.cardData.id);
  }

  deleteCard(): void {
    this.onDelete.emit(this.cardData.id);
  }

}
