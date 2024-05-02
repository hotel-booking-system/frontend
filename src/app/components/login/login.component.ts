import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/Login/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Change styleUrl to styleUrls
})
export class LoginComponent implements OnInit {
 
  cadastroForm: FormGroup;
  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router) { 
    this.cadastroForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    
    });
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  cadastrar() {
    if (this.cadastroForm.valid) {
      console.log(this.cadastroForm.value)
      this.userService.registerUser(this.cadastroForm.value).subscribe({
        next: (response) => {
          console.log('Usuário cadastrado com sucesso!', response)
        },
        error: (error) => console.error('Erro ao cadastrar usuário', error)
      });
    }
  }

  login() {
    if (this.loginForm.valid) {
      const userData = {
        username: this.loginForm.value.email,
        password: this.loginForm.value.senha
      };
      this.userService.loginUser(userData).subscribe({
        next: (response) => {
          if(response.userId){
            sessionStorage.setItem('userId', response.userId);
          }
          this.router.navigate(['/cadastro-pet']);
          console.log('Login realizado com sucesso!', response);
        },
        error: (error) => console.error('Erro ao realizar login', error)
      });
    }
  }

  esqueciSenha(){
    
  }
}
