import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserRequest } from 'src/app/models/user/user-request.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  successMessage: string | null = null;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=]).{8,}$/)]],
      confirmPassword: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      phoneNumber: ['', [Validators.pattern(/^\+?\d{9,14}$/)]],
      address: ['', [Validators.minLength(10), Validators.maxLength(250)]],
      role: [1, Validators.required]
    }, {
      validators: this.passwordMatchValidator
    } as AbstractControlOptions);
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { notEquivalent: true };
    }
    return null;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const userRequest: UserRequest = this.registerForm.value;
    this.authService.signup(userRequest).subscribe({
      next: response => {
        this.successMessage = 'Usuário cadastrado com sucesso!';
        console.log(response);
        this.router.navigate(['/login']);
      },
      error: error => {
        console.error('Erro ao cadastrar usuário. Tente novamente: ', error);
        this.errorMessage = 'Erro ao salvar cadastro. Verifique se os campos foram preenchidos corretamente.'
      }
    });
  }

}
