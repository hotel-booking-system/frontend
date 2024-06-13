import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationResponse } from 'src/app/models/accommodation/accommodation-response.model';
import { AccommodationService } from 'src/app/services/accommodation.service';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.scss']
})
export class AccommodationDetailsComponent implements OnInit {
  accommodation?: AccommodationResponse;

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.accommodationService.getAccommodationById(id).subscribe({
      next: (data) => {
        this.accommodation = data;
      },
      error: (err) => {
        console.error('Error fetching accommodation details', err);
      }
    });
  }

}
