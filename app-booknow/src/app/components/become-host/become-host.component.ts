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
    if (this.acceptTerms) {
      if (!this.isHost) {
        this.userService.becomeHost().subscribe({
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
    this.acceptTerms = false;
  }

  checkIsHost(): void {
    this.userService.isUserHost().subscribe({
      next: (result) => {
        this.isHost = result;
      },
      error: (err) => {
        console.error('Erro ao verificar se o usuário é anfitrião', err);
      }
    });
  }

}
