
import { DynamicFormHolderComponent, MyFormComponent } from './../commom/forms/my.form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyFormModule } from '../commom/forms/my-form.module';
//import { CategoryEditComponent } from './edit/edit.category.component';
import { Routes, RouterModule } from '@angular/router';
import { InputFormModule } from '../commom/input.form/input-form.module';
import { DatagridModule } from '../commom/datagrid/datagrid.module';
import { DialogModule } from 'primeng/primeng';
import { MatDialogModule } from '@angular/material/dialog';
import { ComboboxFormModule } from '../commom/combobox.form/combobox-form.module';
import { AutocompleteFormModule } from '../commom/autocomplete.form/autocomplete.form.module';
import { CalendarFormModule } from '../commom/calendar.form/calendar-form.module';
import { CurrencyInputFormModule } from '../commom/currency.input.form/currency-input-form.module';
import { MaskedInputFormModule } from '../commom/masked.input.form/masked-input-form.module';
import { CategoryListComponent } from './list/category.list.component';
import { CategoryEditComponent } from './edit/category.edit.component';
import { ImageUploadModule } from "angular2-image-upload";
import { CustomFormModule } from '../commom/custom.form/custom-form.module';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  { path: '', component: CategoryListComponent },
];

@NgModule({
  imports: [
  CommonModule, DatagridModule, MatDialogModule, FormsModule, MyFormModule, MatIconModule,
    AutocompleteFormModule, CalendarFormModule, ComboboxFormModule,  CurrencyInputFormModule, InputFormModule, MaskedInputFormModule, CustomFormModule, CustomFormModule, 
    RouterModule.forChild(routes), ImageUploadModule.forRoot()
  ],
  declarations: [CategoryListComponent, CategoryEditComponent, CategoryEditComponent],
  entryComponents: [CategoryEditComponent],
  exports: [RouterModule]
})
export class CategoryModule { }