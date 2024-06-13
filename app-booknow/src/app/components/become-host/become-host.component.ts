import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-become-host',
  templateUrl: './become-host.component.html',
  styleUrls: ['./become-host.component.scss']
})
export class BecomeHostComponent implements OnInit {

  acceptTerms = false;
  isHost = false;  // Verifica se o Usuário já possui OWNER

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.checkIsHost();
  }

  onSubmit(): void {
    const token = sessionStorage.getItem('token');
    if (this.acceptTerms && token) {
      if (!this.isHost) {
        this.userService.becomeHost(token).subscribe({
          next: () => {
            alert('Você agora é um anfitrião!');
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Erro ao tornar-se um anfitrião', err);
          }
        });
      }
    }
  }

  closeAlert(): void {
    // this.showAlert = false;
    this.acceptTerms = false;
  }

  checkIsHost(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.userService.isUserHost(token).subscribe({
        next: (result) => {
          this.isHost = result;
        },
        error: (err) => {
          console.error('Erro ao verificar se o usuário é anfitrião', err);
        }
      });
    }
  }

}
