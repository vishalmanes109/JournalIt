import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  constructor(private authservice: SocialAuthService) {
    this.authservice.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  signInGoogle(): void {
    this.authservice.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authservice.signOut();
    window.location.reload();
  }

  ngOnInit(): void {
    
  }
}
