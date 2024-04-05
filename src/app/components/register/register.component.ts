import { Component } from '@angular/core';
import { RegisterService } from './../../service/register.service';

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

  public constructor(private registerService : RegisterService) {

  }

  onSubmit() {
    console.log('register submetido:', this.register);
    this.registerService.createUser(this.register).subscribe(r => {
      console.log("Enviou");
    })
    // para enviar os dados do formulário para o backend
    // ou outra ação necessária com os dados.
  }
}
