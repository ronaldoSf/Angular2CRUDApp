import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/primeng';
import { MultiSelectFormComponent } from './multiselect-form.component';
import { AutocompleteFormModule } from '../autocomplete.form/autocomplete.form.module';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, 
    AutocompleteFormModule,
  ],
  declarations: [MultiSelectFormComponent],
  entryComponents: [MultiSelectFormComponent],
  exports: [MultiSelectFormComponent]
})
export class MultiSelectFormModule { }
