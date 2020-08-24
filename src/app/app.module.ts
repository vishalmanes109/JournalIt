import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { DiscriptionComponent } from './components/discription/discription.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { EditorComponentsComponent } from './pages/editor/editor-components/editor-components.component';

import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { FormsModule }   from '@angular/forms';


import { HttpClientModule } from "@angular/common/http";
import { routing } from '../app/app-routing.module';
import { JournalComponent } from './components/journal/journal.component';
import { UpdateeditorComponent } from './pages/editor/updateeditor/updateeditor.component';
import { HomeComponent } from './components/home/home.component';
import { ShowEntryComponent } from './pages/show-entry/show-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    DiscriptionComponent,
    WhyUsComponent,
    ContactComponent,
    AboutComponent,
    FooterComponent,
    EditorComponentsComponent,
    JournalComponent,
    UpdateeditorComponent,
    HomeComponent,
    ShowEntryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    RichTextEditorAllModule,
    HttpClientModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
