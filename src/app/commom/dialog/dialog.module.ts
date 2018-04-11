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
  providers: [DialogService],
  entryComponents: [DialogMessageComponent],
  exports: [DialogMessageComponent],
})
export class DialogModule { }
