import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/services/password.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  submitted = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private passwordService: PasswordService
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.value.email;
      this.passwordService.resetPassword(email).subscribe({
        next: (response) => {
          this.successMessage = response;
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Erro ao solicitar redefinição de senha.';
        }
      });
    }
  }

}
