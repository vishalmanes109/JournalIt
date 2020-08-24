"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateeditorComponent = void 0;
var core_1 = require("@angular/core");
var Entry_1 = require("../../../Entry");
var UpdateeditorComponent = /** @class */ (function () {
    function UpdateeditorComponent(sanitizer, entryservice, dataservice, router) {
        this.sanitizer = sanitizer;
        this.entryservice = entryservice;
        this.dataservice = dataservice;
        this.router = router;
        this.text = "";
        this.tools = {
            items: [
                "Bold",
                "Italic",
                "Underline",
                "StrikeThrough",
                "|",
                "FontName",
                "FontSize",
                "FontColor",
                "BackgroundColor",
                "|",
                "LowerCase",
                "UpperCase",
                "|",
                "Formats",
                "Alignments",
                "|",
                "OrderedList",
                "UnorderedList",
                "|",
                "Indent",
                "Outdent",
                "|",
                "CreateLink",
                "CreateTable",
                "Image",
                "|",
                "|",
                "FullScreen",
            ]
        };
        this.title_box = {
            items: []
        };
        this.title = " ";
        this.value = '';
        this.id = this.dataservice.id;
        this.entry = Entry_1.Entry;
        if (this.id == undefined) {
            router.navigate(['/journal']);
        }
    }
    UpdateeditorComponent.prototype.ngOnInit = function () { };
    UpdateeditorComponent.prototype.rteCreated = function () {
        var _this = this;
        this.rteEle.element.focus();
        this.entryservice.getEntry(this.id).subscribe(function (entries) {
            _this.value = entries.body;
            _this.title = entries.title;
            _this.date = entries.date;
            _this.text = _this.sanitizer.bypassSecurityTrustHtml(entries.body);
        });
    };
    UpdateeditorComponent.prototype.onSubmit = function (form) {
        var _this = this;
        //this.text = this.sanitizer.bypassSecurityTrustHtml(form.value.name);
        this.value = "";
        var todays_date = new Date();
        //this.dataservice.isUpdated=true;
        var title = form.value.title;
        var body = form.value.name;
        var date = todays_date.toISOString().slice(0, 10);
        var entry = {
            title: title,
            id: this.dataservice.id,
            date: date,
            body: body
        };
        this.entryservice.updateEntry(body, date, title, this.dataservice.id).subscribe(function (entry) {
            form.value.title = " ";
            _this.entryservice["delete"](_this.dataservice.id).subscribe(function (f) {
                _this.router.navigate(['/journal']);
            });
        });
    };
    UpdateeditorComponent.prototype.addEntry = function (event) {
        var _this = this;
        var date = new Date();
        var newEntry = {
            title: this.entry_title,
            body: this.entry_body,
            date: date.toISOString().slice(0, 10)
        };
        this.entryservice.addEntry(newEntry).subscribe(function (entry) {
            _this.entry_title = '';
            _this.entry_body = '';
        });
        this.entryservice.getEntries().subscribe(function (entries) {
            _this.entries = entries;
        });
    };
    __decorate([
        core_1.ViewChild("fromRTE", { static: false })
    ], UpdateeditorComponent.prototype, "rteEle");
    UpdateeditorComponent = __decorate([
        core_1.Component({
            selector: 'app-updateeditor',
            templateUrl: './updateeditor.component.html',
            styleUrls: ['./updateeditor.component.css']
        })
    ], UpdateeditorComponent);
    return UpdateeditorComponent;
}());
exports.UpdateeditorComponent = UpdateeditorComponent;
