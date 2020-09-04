import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../service/authservice.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authservice: AuthserviceService , private router:Router){}

  canActivate(): boolean{
    if(this.authservice.logedIn())
      return true;
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
