import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {

  updateUserForm: FormGroup;
  submitted = false;
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.updateUserForm = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(250)]],
      phoneNumber: ['', [Validators.pattern('^\\+?\\d{9,14}$')]],
      address: ['', [Validators.minLength(3), Validators.maxLength(250)]],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.updateUserForm.valid) {
      this.userService.updateUser(this.updateUserForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Usuário atualizado com sucesso!';
          this.updateUserForm.reset();
          this.submitted = false;
        },
        error: (err) => {
          console.error('Erro ao atualizar usuário:', err);
        }
      });
    }
  }

  goBack(): void {
    console.log('Voltar para a página inicial');
    this.router.navigateByUrl('/home');
  }

}
