import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Users } from '../../model/users.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Users();

  constructor(private router: Router) { }

  canActivate(): boolean {

    if(sessionStorage.getItem('userdetails')){
        this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
    }

    if(!this.user){
        this.router.navigate(['login']);
    }

    return this.user ? true : false;

  }

}
