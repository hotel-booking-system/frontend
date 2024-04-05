import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Change styleUrl to styleUrls
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
