import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private regUrl = "https://localhost:3000/register";
  private logUrl = "https://localhost:3000/login";

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
