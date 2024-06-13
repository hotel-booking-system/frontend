import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControlOptions, AbstractControl } from '@angular/forms';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-confirm-reset-password',
  templateUrl: './confirm-reset-password.component.html',
  styleUrls: ['./confirm-reset-password.component.scss']
})
export class ConfirmResetPasswordComponent implements OnInit {

  confirmResetPasswordForm: FormGroup;
  submitted = false;
  successMessage: string = '';
  errorMessage: string = '';
  token: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private passwordService: PasswordService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const formOptions: AbstractControlOptions = { validators: this.passwordsMatchValidator };

    this.confirmResetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()-+]).{8,}$')]],
      confirmPassword: ['', [Validators.required]]
    }, formOptions);
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword')!.value;
    const confirmPassword = control.get('confirmPassword')!.value;

    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.confirmResetPasswordForm.valid) {
      const newPassword = this.confirmResetPasswordForm.value.newPassword;
      const confirmPassword = this.confirmResetPasswordForm.value.confirmPassword;

      if (newPassword !== confirmPassword) {
        this.errorMessage = 'As senhas não conferem.';
        return;
      }

      const resetPasswordRequest = {
        newPassword: newPassword,
        confirmPassword: confirmPassword
      };

      this.passwordService.confirmResetPassword(this.token, resetPasswordRequest).subscribe({
        next: (response) => {
          this.successMessage = response;
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Erro ao redefinir senha.';
        }
      });
    }
  }

}
