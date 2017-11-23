import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

import {ButtonModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {MenuItem} from 'primeng/primeng';
import {TieredMenuModule} from 'primeng/primeng';
import {PanelMenuModule} from 'primeng/primeng';
import {BreadcrumbModule} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { UsuarioModule } from './usuario/usuario.module';

const routes: Routes = [
  { path: 'home', component: AppComponent },  
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, 
    ButtonModule, CalendarModule, 
    MatSidenavModule, MatIconModule, MatToolbarModule, TieredMenuModule, PanelMenuModule, BreadcrumbModule,
    UsuarioModule, RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
