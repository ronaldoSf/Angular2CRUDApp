import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaskedInputFormComponent } from './masked-input-form.component';
import { Ng2InputMaskModule } from '../../../libs/ng2-masked-input/ng2-input-mask.module';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    Ng2InputMaskModule,
  ],
  declarations: [MaskedInputFormComponent],
  entryComponents: [MaskedInputFormComponent],
  exports: [MaskedInputFormComponent]
})
export class MaskedInputFormModule { }
