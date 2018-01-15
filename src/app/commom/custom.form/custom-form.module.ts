import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFormComponent } from './custom-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [CustomFormComponent],
  entryComponents: [CustomFormComponent],
  exports: [CustomFormComponent]
})
export class CustomFormModule { }
