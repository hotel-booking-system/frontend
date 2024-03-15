import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  register = {
    name: '',
    email: '',
    phoneNumber: '',
    password: ''
  };
  onSubmit() {
    console.log('register submetido:', this.register);
    // para enviar os dados do formulário para o backend
    // ou outra ação necessária com os dados.
  }
}
