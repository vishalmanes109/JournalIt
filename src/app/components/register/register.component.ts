import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/service/authservice.service';
import { Router } from '@angular/router';
import * as CryptoJS from "crypto-js";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authservice: AuthserviceService,
    private router: Router
  ) {}

  registerUser = {
    email: "",
    password: "",
  };
  registererror:string;

  encrypt() {
    if (
      this.registerUser.email.trim() === "" ||
      this.registerUser.password.trim() === ""
    ) {
      this.registererror = "Please fill the textboxes.";
      return;
    } else {
      this.registerUser.password = CryptoJS.SHA3(this.registerUser.password.trim(), {
        outputLength: 224,
      }).toString();
    }
  }


  Register() {
    this.encrypt();
    this.authservice.registerUser(this.registerUser).subscribe(
      (res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", this.registerUser.email.split('@')[0]);
        this.router.navigate(["/journal"]);
      },
      (err) => {
        console.log(err);
        this.registererror=err.error;
      }
    );
  }

  ngOnInit(): void {}
}
