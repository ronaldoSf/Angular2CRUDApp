import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { ListUserComponent } from './list.usuario.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'users', component: ListUserComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListUserComponent],
  bootstrap: [ListUserComponent]
})
export class UsuarioModule { }
