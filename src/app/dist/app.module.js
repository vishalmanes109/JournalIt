"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var navbar_component_1 = require("./components/navbar/navbar.component");
var header_component_1 = require("./components/header/header.component");
var discription_component_1 = require("./components/discription/discription.component");
var why_us_component_1 = require("./components/why-us/why-us.component");
var contact_component_1 = require("./components/contact/contact.component");
var about_component_1 = require("./components/about/about.component");
var footer_component_1 = require("./components/footer/footer.component");
var editor_components_component_1 = require("./pages/editor/editor-components/editor-components.component");
var ej2_angular_richtexteditor_1 = require("@syncfusion/ej2-angular-richtexteditor");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var app_routing_module_1 = require("../app/app-routing.module");
var journal_component_1 = require("./components/journal/journal.component");
var updateeditor_component_1 = require("./pages/editor/updateeditor/updateeditor.component");
var home_component_1 = require("./components/home/home.component");
var show_entry_component_1 = require("./pages/show-entry/show-entry.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                navbar_component_1.NavbarComponent,
                header_component_1.HeaderComponent,
                discription_component_1.DiscriptionComponent,
                why_us_component_1.WhyUsComponent,
                contact_component_1.ContactComponent,
                about_component_1.AboutComponent,
                footer_component_1.FooterComponent,
                editor_components_component_1.EditorComponentsComponent,
                journal_component_1.JournalComponent,
                updateeditor_component_1.UpdateeditorComponent,
                home_component_1.HomeComponent,
                show_entry_component_1.ShowEntryComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                ej2_angular_richtexteditor_1.RichTextEditorAllModule,
                http_1.HttpClientModule,
                app_routing_module_1.routing
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
