import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponentsComponent } from '../app/pages/editor/editor-components/editor-components.component';
import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { AboutComponent } from '../app/components/about/about.component';
import { JournalComponent } from '../app/components/journal/journal.component';
import { UpdateeditorComponent } from '../app/pages/editor/updateeditor/updateeditor.component';

const routes: Routes = [
  { path: '', component: NavbarComponent },
  { path: 'editor', component: EditorComponentsComponent },
  { path: 'about',component: AboutComponent},
  { path: 'journal', component: JournalComponent },
  { path: 'update', component: UpdateeditorComponent}
  ];


export const routing = RouterModule.forRoot(routes);
