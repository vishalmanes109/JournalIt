import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponentsComponent } from '../app/pages/editor/editor-components/editor-components.component';
import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { AboutComponent } from '../app/components/about/about.component';
import { JournalComponent } from '../app/components/journal/journal.component';
import { UpdateeditorComponent } from '../app/pages/editor/updateeditor/updateeditor.component';
import { HomeComponent } from '../app/components/home/home.component';
import { ShowEntryComponent } from '../app/pages/show-entry/show-entry.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'editor', component: EditorComponentsComponent,canActivate:[AuthGuard] },
  { path: 'about',component: AboutComponent},
  { path: 'journal', component: JournalComponent ,canActivate:[AuthGuard] },
  { path: 'update', component: UpdateeditorComponent,canActivate:[AuthGuard]},
  { path: 'show-all', component: ShowEntryComponent,canActivate:[AuthGuard]},
  { path: 'register', component: RegisterComponent},
  {path:'login',component:LoginComponent}
  ];


export const routing = RouterModule.forRoot(routes);
