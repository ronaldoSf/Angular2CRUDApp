import { InputFormComponent } from './../commom/input.form/input.form.component';
import { DynamicFormHolderComponent } from './../commom/forms/my.form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { UserListComponent } from './list/list.user.component';
import { RouterModule, Routes } from '@angular/router';
import { DatagridModule } from '../commom/datagrid/datagrid.module';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { UserEditComponent } from './edit/edit.user.component';
import { MyFormComponent } from '../commom/forms/my.form.component';
import { CalendarModule } from 'primeng/primeng';
import { CalendarFormComponent } from '../commom/calendar.form/calendar-form.component';
import { ToArrayPipe } from '../commom/pipes';
import { MaskedInputFormComponent } from '../commom/masked.input.form/masked-input-form.component';
import { Ng2InputMaskModule } from '../commom/libs/ng2-masked-input/ng2-input-mask.module';
import { ComboboxFormComponent } from '../commom/combobox.form/combobox-form.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
];

@NgModule({
  imports: [
    CommonModule, FormsModule, DatagridModule, MatDialogModule, ReactiveFormsModule, CalendarModule, Ng2InputMaskModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserListComponent, UserEditComponent, MyFormComponent, DynamicFormHolderComponent, InputFormComponent, CalendarFormComponent, MaskedInputFormComponent, ComboboxFormComponent, ToArrayPipe],
  entryComponents: [UserEditComponent, InputFormComponent, CalendarFormComponent, MaskedInputFormComponent, ComboboxFormComponent],
  exports: [RouterModule]
})
export class UserModule { }
