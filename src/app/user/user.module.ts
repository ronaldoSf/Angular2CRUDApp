// import { InputFormComponent } from './../commom/input.form/input.form.component';
// import { DynamicFormHolderComponent } from './../commom/forms/my.form.component';
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// import { UserListComponent } from './list/list.user.component';
// import { RouterModule, Routes } from '@angular/router';
// import { DatagridModule } from '../commom/datagrid/datagrid.module';
// import { MatDialogModule, MatDialog } from '@angular/material/dialog';
// import { UserEditComponent } from './edit/edit.user.component';
// import { MyFormComponent } from '../commom/forms/my.form.component';
// import { CalendarModule, InputMaskModule, AutoCompleteModule } from 'primeng/primeng';
// import { CalendarFormComponent } from '../commom/calendar.form/calendar-form.component';
// import { ToArrayPipe } from '../commom/pipes';
// import { MaskedInputFormComponent } from '../commom/masked.input.form/masked-input-form.component';
// import { ComboboxFormComponent } from '../commom/combobox.form/combobox-form.component';
// import { CurrencyInputFormComponent } from '../commom/currency.input.form/currency-input-form.component';
// //import { MoneyMaskModule } from '../../libs/money-mask/money-mask.module';
// import { Ng2InputMaskModule } from '../../libs/ng2-masked-input/ng2-input-mask.module';
// import { CurrencyMaskModule } from "ng2-currency-mask";
// import { AutoCompleteFormComponent } from '../commom/autocomplete.form/auto-complete-form.component';

// const routes: Routes = [
//   { path: '', component: UserListComponent },
// ];

// @NgModule({
//   imports: [
//     CommonModule, FormsModule, DatagridModule, MatDialogModule, ReactiveFormsModule, CalendarModule, InputMaskModule, Ng2InputMaskModule, CurrencyMaskModule, AutoCompleteModule,
//     RouterModule.forChild(routes)
//   ],
//   declarations: [UserListComponent, UserEditComponent, MyFormComponent, DynamicFormHolderComponent, InputFormComponent, CalendarFormComponent, MaskedInputFormComponent, ComboboxFormComponent, CurrencyInputFormComponent, AutoCompleteFormComponent, ToArrayPipe],
//   entryComponents: [UserEditComponent, InputFormComponent, CalendarFormComponent, MaskedInputFormComponent, ComboboxFormComponent, CurrencyInputFormComponent, AutoCompleteFormComponent],
//   exports: [RouterModule]
// })
// export class UserModule { }

import { DynamicFormHolderComponent, MyFormComponent } from './../commom/forms/my.form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyFormModule } from '../commom/forms/my-form.module';
import { UserListComponent } from './list/list.user.component';
import { UserEditComponent } from './edit/edit.user.component';
import { Routes, RouterModule } from '@angular/router';
import { InputFormModule } from '../commom/input.form/input-form.module';
import { DatagridModule } from '../commom/datagrid/datagrid.module';
import { DialogModule, AutoCompleteModule } from 'primeng/primeng';
import { MatDialogModule } from '@angular/material/dialog';
import { ComboboxFormModule } from '../commom/combobox.form/combobox-form.module';
import { AutocompleteFormModule } from '../commom/autocomplete.form/autocomplete.form.module';
import { CalendarFormModule } from '../commom/calendar.form/calendar-form.module';
import { CurrencyInputFormModule } from '../commom/currency.input.form/currency-input-form.module';
import { MaskedInputFormModule } from '../commom/masked.input.form/masked-input-form.module';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { CustomFormModule } from '../commom/custom.form/custom-form.module';

const routes: Routes = [
  { path: '', component: UserListComponent },
];

@NgModule({
  imports: [
    CommonModule, DatagridModule, MatDialogModule, FormsModule, MyFormModule, MultiselectDropdownModule,
    AutoCompleteModule, CalendarFormModule, ComboboxFormModule,  CurrencyInputFormModule, InputFormModule, MaskedInputFormModule, CustomFormModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserListComponent, UserEditComponent],
  entryComponents: [UserEditComponent],
  exports: [RouterModule]
})
export class UserModule { }
