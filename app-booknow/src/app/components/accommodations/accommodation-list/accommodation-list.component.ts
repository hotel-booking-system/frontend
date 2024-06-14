import { Component, OnInit } from '@angular/core';
import { AccommodationResponse } from 'src/app/models/accommodation/accommodation-response.model';
import { AccommodationService } from 'src/app/services/accommodation.service';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.scss']
})
export class AccommodationListComponent implements OnInit {

  accommodations: AccommodationResponse[] = [];

  constructor(private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.loadAccommodations();
  }

  loadAccommodations(): void {
    this.accommodationService.getAllAccommodations().subscribe((data: AccommodationResponse[]) => {
      this.accommodations = data;
    });
  }

  handleDelete(id: number): void {
    if (confirm('Você tem certeza que deseja excluir esta acomodação?')) {
      this.accommodationService.deleteAccommodation(id).subscribe(() => {
        this.accommodations = this.accommodations.filter(accommodation => accommodation.id !== id);
      });
    }
  }

   handleEdit(id: number): void {
    // Implemente a lógica para editar acomodação aqui, por exemplo, navegação para uma rota de edição
    console.log(`Editando acomodação com ID: ${id}`);
    // Exemplo de navegação para a rota de edição
    // this.router.navigate(['/edit', id]);
  }

  handleViewDetails(id: number): void {
    // Implemente a lógica para visualizar detalhes da acomodação aqui, por exemplo, navegação para uma rota de detalhes
    console.log(`Visualizando detalhes da acomodação com ID: ${id}`);
    // Exemplo de navegação para a rota de detalhes
    // this.router.navigate(['/details', id]);
  }

}
