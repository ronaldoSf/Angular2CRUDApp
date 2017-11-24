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

const routes: Routes = [
  { path: 'home', component: AppComponent },  
  { path: 'l', loadChildren: 'app/user/user.module#UserModule' }  
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, 
    ButtonModule, CalendarModule, 
    MatSidenavModule, MatIconModule, MatToolbarModule, TieredMenuModule, PanelMenuModule, BreadcrumbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
