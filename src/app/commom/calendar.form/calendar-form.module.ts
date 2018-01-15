import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule, InputMaskModule } from 'primeng/primeng';
import { CalendarFormComponent } from './calendar-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, 
    CalendarModule, InputMaskModule
  ],
  declarations: [CalendarFormComponent],
  entryComponents: [CalendarFormComponent],
  exports: [CalendarFormComponent]
})
export class CalendarFormModule { }
