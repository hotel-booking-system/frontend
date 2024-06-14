import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements AfterViewInit, OnInit {

  private deactivateModal: any;
  dropdownOpen = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngAfterViewInit(): void {
    const modalElement = document.getElementById('deactivateModal');
    if (modalElement) {
      this.deactivateModal = new bootstrap.Modal(modalElement);
    } else {
      console.error('Modal element not found');
    }
  }

  openDeactivateModal(): void {
    this.deactivateModal.show();
  }

  deactivateAccount(): void {
    this.userService.deactivateUser().subscribe({
      next: () => {
        console.log('Conta desativada com sucesso!');
        this.logout();
      },
      error: err => {
        console.error('Erro ao desativar a conta.', err);
      }
    });
  }

  private checkAuthentication(): void {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

}
