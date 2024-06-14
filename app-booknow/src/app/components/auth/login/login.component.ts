import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

// Para a página de Login
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Verificar se já está logado e redirecionar
    if (this.authService.isAuthenticated()) {
      this.authService.redirectToHome();
    }
  }

  // Após o login bem-sucedido, o método redireciona para a página inicial usando redirectToHome(), que é implementado no serviço AuthService.
  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          console.log("Login bem-sucedido.");
          this.authService.redirectToHome();
        },
        error: () => this.errorMessage = 'Email ou senha incorretos.'
      });
    }
  }
}
