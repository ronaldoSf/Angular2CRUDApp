import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { ListUserComponent } from './list/list.user.component';
import { RouterModule, Routes } from '@angular/router';
import { DatagridModule } from '../commom/datagrid/datagrid.module';

const routes: Routes = [
  { path: '', component: ListUserComponent },  
];

@NgModule({
  imports: [
    CommonModule, FormsModule, DatagridModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListUserComponent],
  exports: [RouterModule]
})
export class UserModule { }
