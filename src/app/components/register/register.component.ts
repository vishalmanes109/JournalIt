import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/service/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authservice:AuthserviceService, private router :Router) { }

  registerUser={
    email:'',
    password:''
  };

  Register(){
    this.authservice.registerUser(this.registerUser).subscribe(
      res=>{
        localStorage.setItem('token',res.token);
        this.router.navigate(['/login']);

      },
      err=>console.log(err)
    )
  }

  ngOnInit(): void {
  }

}
