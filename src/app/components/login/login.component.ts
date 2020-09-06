import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/service/authservice.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginerror:string='';
  constructor( private authservice:AuthserviceService, private router:Router ) { }

  loginUser={
    email: '',
    password: ''
  };
  ngOnInit(): void {
  }

  encrypt(){
     if (
       this.loginUser.email.trim() === "" ||
       this.loginUser.password.trim() === ""
     ) {
       this.loginerror = "Please fill the textboxes.";
       return;
     } else {
       
         this.loginUser.password = CryptoJS.SHA3(
           this.loginUser.password.trim(),{outputLength: 224}
         ).toString();
         console.log(this.loginUser.password);
     }
  }

  Login(){
    this.encrypt();
    this.authservice.loginUser(this.loginUser).subscribe(
      res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('username',this.loginUser.email.split('@')[0]);
      this.router.navigate(['/journal']);
   },
   err=>{
     console.log(err);
     this.loginerror=err.error;
   });
}

}
