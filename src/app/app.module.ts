import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {ButtonModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {MenuItem} from 'primeng/primeng';
import {TieredMenuModule} from 'primeng/primeng';
import {PanelMenuModule} from 'primeng/primeng';
import {BreadcrumbModule} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { DatagridComponent } from './commom/datagrid/datagrid.component';
import { DialogMessageComponent } from './commom/dialog.message/dialog-message-component.component';

const routes: Routes = [
  { path: '', loadChildren: 'app/home/home.module#HomeModule' },  
  { path: 'home', loadChildren: 'app/home/home.module#HomeModule' },  
  { path: 'usuario', loadChildren: 'app/user/user.module#UserModule' },
  { path: 'cliente', loadChildren: 'app/client/client.module#ClientModule' },
  { path: 'perfil', loadChildren: 'app/profile/profile.module#ProfileModule' } ,
];

@NgModule({
  declarations: [
    AppComponent,
    DialogMessageComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule,
    ButtonModule, CalendarModule,  MatMenuModule, MatIconModule, MatButtonModule, MatTooltipModule,
    MatSidenavModule, MatToolbarModule, TieredMenuModule, PanelMenuModule, BreadcrumbModule, ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  entryComponents: [DialogMessageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
