import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationRequest } from 'src/app/models/accommodation/accommodation-request.model';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { AuthService } from 'src/app/services/auth.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-accommodation-form',
  templateUrl: './accommodation-form.component.html',
  styleUrls: ['./accommodation-form.component.scss']
})
export class AccommodationFormComponent implements OnInit {

  accommodationForm!: FormGroup;
  submitted = false;
  successMessage: string | null = null;
  accommodationId?: number;
  isEditMode = false;
  private deactivateModal: any;

  constructor(
    private formBuilder: FormBuilder,
    private accommodationService: AccommodationService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.accommodationId = +id;
        this.isEditMode = true;
        this.loadAccommodationData();
      }
    });
  }

  initForm(): void {
    this.accommodationForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      location: ['', [Validators.required]],
      price: [0, [Validators.required]],
      maxGuests: [0],
      amenities: ['']
    });
  }

  get formattedPrice(): string {
    const priceControl = this.accommodationForm.get('price');
    if (priceControl && priceControl.value) {
      const priceValue = parseFloat(priceControl.value);
      return `R$ ${priceValue.toFixed(2)}`;
    }
    return 'R$ 0.00';
  }

  loadAccommodationData(): void {
    if (this.accommodationId) {
      this.accommodationService.getAccommodationById(this.accommodationId).subscribe({
        next: (data) => {
          this.accommodationForm.patchValue(data);
        },
        error: (err) => {
          console.error('Error fetching accommodation details', err);
        }
      });
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.accommodationForm.invalid) {
      return;
    }

    const accommodationRequest: AccommodationRequest = this.accommodationForm.value;

    if (this.isEditMode && this.accommodationId) {
      this.accommodationService.updateAccommodation(this.accommodationId, accommodationRequest).subscribe({
        next: response => {
          this.successMessage = 'Acomodação atualizada com sucesso!';
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
        error: err => {
          console.error('Erro ao atualizar acomodação.', err);
        }
      });
    } else {
      this.accommodationService.createAccommodation(accommodationRequest).subscribe({
        next: response => {
          this.successMessage = 'Acomodação cadastrada com sucesso!';
          this.accommodationForm.reset();
          this.submitted = false;
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
        error: err => {
          console.error('Erro ao cadastrar acomodação.', err);
        }
      });
    }
  }

  openDeactivateModal(): void {
    const modalElement = document.getElementById('deactivateModal');
    if (modalElement) {
      this.deactivateModal = new bootstrap.Modal(modalElement);
      this.deactivateModal.show();
    } else {
      console.error('Modal element not found');
    }
  }

  deactivateAccount(): void {
    // Implementar a lógica para desativar a conta
    // Exemplo: this.authService.deactivateAccount().subscribe(...);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
