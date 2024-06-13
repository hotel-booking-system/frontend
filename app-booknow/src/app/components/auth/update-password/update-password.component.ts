import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  updatePasswordForm: FormGroup = this.formBuilder.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()-+]).{8,}$')]],
    confirmPassword: ['', Validators.required]
  });

  submitted = false;
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private passwordService: PasswordService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.updatePasswordForm.invalid) {
      return;
    }

    const updatePasswordRequest = {
      currentPassword: this.updatePasswordForm.value.currentPassword,
      newPassword: this.updatePasswordForm.value.newPassword,
      confirmPassword: this.updatePasswordForm.value.confirmPassword
    };

    this.passwordService.updatePassword(updatePasswordRequest).subscribe({
      next: () => {
        this.notificationService.showSuccess('Senha atualizada com sucesso!');
        this.updatePasswordForm.reset();
        this.submitted = false;
      },
      error: () => {
        this.notificationService.showError('Erro ao atualizar senha');
      }
    });
  }

}
