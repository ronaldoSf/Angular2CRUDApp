import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TieredMenuModule, MenuItem} from 'primeng/primeng';
import {PanelMenuModule, MenuItem} from 'primeng/primeng';
import {BreadcrumbModule, MenuItem} from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, 
    ButtonModule, CalendarModule, 
    MatSidenavModule, MatIconModule, MatToolbarModule, TieredMenuModule, PanelMenuModule, BreadcrumbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
