import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from './dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogMessageComponent } from '../dialog.message/dialog-message-component.component';

@NgModule({
  imports: [
    CommonModule, MatDialogModule
  ],
  declarations: [DialogMessageComponent],
  entryComponents: [DialogMessageComponent],
  exports: [DialogService, DialogMessageComponent],
})
export class DialogModule { }
