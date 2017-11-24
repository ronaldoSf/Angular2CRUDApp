import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListUserComponent } from './list.user.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ListUserComponent },  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListUserComponent],
  exports: [RouterModule]
})
export class UserModule { }
