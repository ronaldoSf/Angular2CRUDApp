import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoCompleteModule } from 'primeng/primeng';
import { AutoCompleteFormComponent } from './auto-complete-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, 
    AutoCompleteModule,
  ],
  declarations: [AutoCompleteFormComponent],
  entryComponents: [AutoCompleteFormComponent],
  exports: [AutoCompleteFormComponent]
})
export class AutocompleteFormModule { }
