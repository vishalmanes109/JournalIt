import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private regUrl="http://localhost:8080/api/register";
  private logUrl = "http://localhost:8080/api/login";
  constructor( private http:HttpClient , private router:Router) { }

  registerUser(user){
    return this.http.post<any>(this.regUrl,user);
  }
 loginUser(user){
   return this.http.post<any>(this.logUrl,user);
 }

 logedIn(){
   return !!localStorage.getItem('token');
 }

 getToken(){
   return localStorage.getItem('token');
 }

 logout(){
   localStorage.removeItem('token');
   localStorage.removeItem('username');
   this.router.navigate(['/login']);


 }

}
