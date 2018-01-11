import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2InputMaskModule } from '../../../libs/ng2-masked-input/ng2-input-mask.module';
import { CurrencyInputFormComponent } from './currency-input-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoneyMaskModule } from '../../../libs/money-mask/money-mask.module';
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    Ng2InputMaskModule, CurrencyMaskModule,
  ],
  declarations: [CurrencyInputFormComponent],
  entryComponents: [CurrencyInputFormComponent],
  exports: [CurrencyInputFormComponent]
})
export class CurrencyInputFormModule { }
