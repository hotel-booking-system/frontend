import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms'; // exemplo Ju
import { RegisterService } from './../../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  implements OnInit {

registerForm : FormGroup;
userId!: Number;
  
  public constructor(private registerService : RegisterService) {
    this.registerForm = new FormGroup({

      documentNumber: new FormControl('',[Validators.min(11), Validators.max(11)]),
      email: new FormControl(''),
      phoneNumber : new FormControl('',[Validators.min(5), Validators.max(15)]),
      password: new FormControl(''),
    })
  }
  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    this.userId = userId ? Number(userId) : 0;
  }
  

  cadastrar() {
    if (this.registerForm.valid) {
      const formValues = { ...this.registerForm.value, userId: this.userId };
  
      this.registerService.registerUser(formValues).subscribe({
        next: (response) => {
          console.log('Cadastrado com sucesso', response);
        },
        error: (error) => {
          console.error('Erro ao se cadastrar', error);
        }
      });
    } else {
      console.error('Formulário inválido');
    }
  }
  
}
