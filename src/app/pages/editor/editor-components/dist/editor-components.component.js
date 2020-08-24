"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditorComponentsComponent = void 0;
var core_1 = require("@angular/core");
var EditorComponentsComponent = /** @class */ (function () {
    function EditorComponentsComponent(sanitizer, entryservice) {
        this.sanitizer = sanitizer;
        this.entryservice = entryservice;
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
                "FullScreen"
            ]
        };
        this.title_box = {
            items: [
                "Bold",
                "Italic",
                "Underline",
                "|",
                "FontName",
                "FontColor",
                "|",
                "LowerCase",
                "UpperCase",
                "|",
                "FullScreen",
            ]
        };
        this.value = null;
        this.title = "";
    }
    EditorComponentsComponent.prototype.ngOnInit = function () { };
    EditorComponentsComponent.prototype.rteCreated = function () {
        this.rteEle.element.focus();
    };
    EditorComponentsComponent.prototype.onSubmit = function (form) {
        this.text = this.sanitizer.bypassSecurityTrustHtml(form.value.name);
        this.value = "";
        var date = new Date();
        var newEntry = {
            title: form.value.title,
            body: form.value.name,
            date: date.toISOString().slice(0, 10)
        };
        this.entryservice.addEntry(newEntry).subscribe(function (entry) {
            form.value.title = " ";
        });
    };
    EditorComponentsComponent.prototype.getEntries = function () {
        var _this = this;
        this.entryservice.getEntries().subscribe(function (entries) {
            _this.entries = entries;
        });
    };
    EditorComponentsComponent.prototype.addEntry = function (event) {
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
    EditorComponentsComponent.prototype.deleteEntry = function (entry) {
        var _this = this;
        //this.entry = entry.filter(t => t.id != entry.id);
        this.entryservice.deleteEntry(entry).subscribe();
        this.entryservice.getEntries().subscribe(function (entries) {
            _this.entries = entries;
        });
    };
    __decorate([
        core_1.ViewChild("fromRTE", { static: false })
    ], EditorComponentsComponent.prototype, "rteEle");
    EditorComponentsComponent = __decorate([
        core_1.Component({
            selector: "app-editor-components",
            templateUrl: "./editor-components.component.html",
            styleUrls: ["./editor-components.component.css"]
        })
    ], EditorComponentsComponent);
    return EditorComponentsComponent;
}());
exports.EditorComponentsComponent = EditorComponentsComponent;
