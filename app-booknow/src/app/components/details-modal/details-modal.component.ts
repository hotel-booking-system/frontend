import { Component, Input } from '@angular/core';
import { AccommodationResponse } from 'src/app/models/accommodation/accommodation-response.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss']
})
export class DetailsModalComponent {

  @Input() accommodation!: AccommodationResponse;

  constructor(public activeModal: NgbActiveModal) { }

}
