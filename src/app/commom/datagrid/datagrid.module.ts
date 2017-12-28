import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

import { DatagridComponent } from './datagrid.component';

@NgModule({
  imports: [
    CommonModule, FormsModule,
    MatCheckboxModule, MatIconModule, MatTooltipModule
  ],
  exports: [
    DatagridComponent
  ],
  declarations: [DatagridComponent]
})
export class DatagridModule { }
