import { InputFormComponent } from './../commom/input.form/input.form.component';
import { DynamicFormHolderComponent } from './../commom/forms/my.form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { UserListComponent } from './list/list.user.component';
import { RouterModule, Routes } from '@angular/router';
import { DatagridModule } from '../commom/datagrid/datagrid.module';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import { UserEditComponent } from './edit/edit.user.component';
import { MyFormComponent } from '../commom/forms/my.form.component';

const routes: Routes = [
  { path: '', component: UserListComponent },  
];

@NgModule({
  imports: [
    CommonModule, FormsModule, DatagridModule, MatDialogModule, ReactiveFormsModule, 
    RouterModule.forChild(routes)
  ],
  declarations: [UserListComponent, UserEditComponent, MyFormComponent, DynamicFormHolderComponent, InputFormComponent],
  entryComponents: [UserEditComponent, InputFormComponent],
  exports: [RouterModule]
})
export class UserModule { }
