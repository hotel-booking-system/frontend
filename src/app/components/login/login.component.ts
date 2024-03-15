import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login = {
    email: '',
    password: ''
  };
  onSubmit() {
    console.log('login submetido:', this.login);
    // para enviar os dados do formulário para o backend
    // ou outra ação necessária com os dados.
  }
}
