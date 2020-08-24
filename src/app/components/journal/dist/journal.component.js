"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JournalComponent = void 0;
var core_1 = require("@angular/core");
var JournalComponent = /** @class */ (function () {
    function JournalComponent(sanitizer, entryservice, dataservice) {
        var _this = this;
        this.sanitizer = sanitizer;
        this.entryservice = entryservice;
        this.dataservice = dataservice;
        if (this.dataservice.isUpdated)
            window.location.reload();
        this.entryservice.getEntries().subscribe(function (entries) {
            _this.entries = entries;
        });
    }
    // delete entry
    JournalComponent.prototype.deleteEntry = function (entry) {
        var _this = this;
        this.entryservice.deleteEntry(entry).subscribe();
        this.entryservice.getEntries().subscribe(function (entries) {
            _this.entries = entries;
        });
    };
    JournalComponent.prototype.updateEntry = function (entry) {
        this.dataservice.id = entry._id;
        this.dataservice.isUpdated = false;
    };
    JournalComponent.prototype.showEntry = function (entry) {
        this.dataservice.id = entry._id;
    };
    JournalComponent.prototype.ngOnInit = function () {
    };
    JournalComponent = __decorate([
        core_1.Component({
            selector: 'app-journal',
            templateUrl: './journal.component.html',
            styleUrls: ['./journal.component.css']
        })
    ], JournalComponent);
    return JournalComponent;
}());
exports.JournalComponent = JournalComponent;
