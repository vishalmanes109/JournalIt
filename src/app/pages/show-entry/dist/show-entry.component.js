"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShowEntryComponent = void 0;
var core_1 = require("@angular/core");
var ShowEntryComponent = /** @class */ (function () {
    function ShowEntryComponent(sanitizer, entryservice, dataservice, router) {
        var _this = this;
        this.sanitizer = sanitizer;
        this.entryservice = entryservice;
        this.dataservice = dataservice;
        this.router = router;
        this.id = this.dataservice.id;
        if (this.id == undefined) {
            router.navigate(['/journal']);
        }
        this.entryservice.getEntry(this.id).subscribe(function (entries) {
            _this.title = entries.title;
            _this.date = entries.date;
            _this.body = _this.sanitizer.bypassSecurityTrustHtml(entries.body);
        });
    }
    ShowEntryComponent.prototype.ngOnInit = function () {
    };
    ShowEntryComponent.prototype.update = function () {
        this.dataservice.id = this.id;
    };
    ShowEntryComponent = __decorate([
        core_1.Component({
            selector: 'app-show-entry',
            templateUrl: './show-entry.component.html',
            styleUrls: ['./show-entry.component.css']
        })
    ], ShowEntryComponent);
    return ShowEntryComponent;
}());
exports.ShowEntryComponent = ShowEntryComponent;
