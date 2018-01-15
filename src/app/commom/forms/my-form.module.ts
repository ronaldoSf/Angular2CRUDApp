import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToArrayPipe } from '../../commom/pipes';
import { MyFormComponent, DynamicFormHolderComponent } from './my.form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ToArrayPipe, MyFormComponent, DynamicFormHolderComponent],
  exports: [MyFormComponent]
})
export class MyFormModule { }
