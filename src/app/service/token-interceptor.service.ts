import { Injectable,Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthserviceService } from './authservice.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }

  intercept(req,next){
    let authservice= this.injector.get(AuthserviceService)
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${authservice.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
