import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { AuthserviceService } from 'src/app/service/authservice.service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  constructor( public authservice: AuthserviceService ) {}
  

  ngOnInit(): void {
    
  }
}
