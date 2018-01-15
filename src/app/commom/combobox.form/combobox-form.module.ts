import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboboxFormComponent } from './combobox-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [ComboboxFormComponent],
  entryComponents: [ComboboxFormComponent],
  exports: [ComboboxFormComponent]
})
export class ComboboxFormModule { }
