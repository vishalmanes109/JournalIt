import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/service/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private authservice:AuthserviceService, private router:Router ) { }

  loginUser={
    email: '',
    password: ''
  };
  ngOnInit(): void {
  }
  Login(){
 this.authservice.loginUser(this.loginUser).subscribe(
   res => {
     localStorage.setItem('token', res.token);
     localStorage.setItem('username',this.loginUser.email);
     this.router.navigate(['/journal']);
   },
   err=>console.log(err)
 )
  }

}
