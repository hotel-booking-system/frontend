import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccommodationResponse } from 'src/app/models/accommodation/accommodation-response.model';
import { AccommodationService } from 'src/app/services/accommodation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  accommodations: AccommodationResponse[] = [];

  constructor(
    private accommodationService: AccommodationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAccommodations();
  }

  loadAccommodations(): void {
    this.accommodationService.getAllAccommodations().subscribe({
      next: (data) => {
        this.accommodations = data;
      },
      error: (err) => {
        console.error('Error fetching accommodations', err);
      }
    });
  }

  editAccommodation(accommodation: AccommodationResponse): void {
    this.router.navigate(['/accommodation/edit', accommodation.id]);
  }

  viewDetails(accommodation: AccommodationResponse): void {
    this.router.navigate(['/accommodation', accommodation.id, 'details']);
  }

  deleteAccommodation(accommodation: AccommodationResponse): void {
    if (confirm(`Tem certeza que deseja excluir ${accommodation.title}?`)) {
      this.accommodationService.deleteAccommodation(accommodation.id).subscribe({
        next: () => {
          this.accommodations = this.accommodations.filter(acc => acc.id !== accommodation.id);
        },
        error: (err) => {
          console.error('Error deleting accommodation', err);
        }
      });
    }
  }

}
