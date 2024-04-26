import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  user: User = new User();
  registrationSuccess = false;
  errorMessage: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() { }

  onSubmit() {
    this.userService.registerUser(this.user).subscribe(
      (registsteredUser) => {
        this.registrationsuccess = true;
        this.user = new User();
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

}
