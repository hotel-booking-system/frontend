import { Component, Input } from '@angular/core';
import { AccommodationResponse } from 'src/app/models/accommodation/accommodation-response.model';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.scss']
})
export class AccommodationDetailsComponent {

  @Input() accommodation!: AccommodationResponse;

}
