import { Component, Input } from '@angular/core';
import { AccommodationResponse } from 'src/app/models/accommodation/accommodation-response.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.scss']
})
export class AccommodationDetailsComponent {

  @Input() accommodation!: AccommodationResponse;

  constructor(private modalService: NgbModal) {}

  open(): void {
    this.modalService.open('accommodationDetailsModal');
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

}
