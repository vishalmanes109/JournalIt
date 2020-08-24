"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavbarComponent = void 0;
var core_1 = require("@angular/core");
var angularx_social_login_1 = require("angularx-social-login");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(authservice) {
        var _this = this;
        this.authservice = authservice;
        this.authservice.authState.subscribe(function (user) {
            _this.user = user;
            _this.loggedIn = user != null;
        });
    }
    NavbarComponent.prototype.signInGoogle = function () {
        this.authservice.signIn(angularx_social_login_1.GoogleLoginProvider.PROVIDER_ID);
    };
    NavbarComponent.prototype.signOut = function () {
        this.authservice.signOut();
        window.location.reload();
    };
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: "app-navbar",
            templateUrl: "./navbar.component.html",
            styleUrls: ["./navbar.component.css"]
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
