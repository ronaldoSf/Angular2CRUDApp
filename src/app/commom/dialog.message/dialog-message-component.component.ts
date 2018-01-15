import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from '../dialog/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-message-component',
  templateUrl: './dialog-message-component.component.html',
  styleUrls: ['./dialog-message-component.component.scss']
})
export class DialogMessageComponent implements OnInit {

    public matDialogRef: MatDialogRef<DialogMessageComponent>

    @Input()
    public message: string

    @Input()
    public buttonMessage: string = "Ok"

    @Input()
    public callBack: Function

    public okEvent() {
        var closeDialog: boolean = true

        if (this.callBack) {
            this.callBack()
        }
        
        if (closeDialog) {
            this.matDialogRef.close()
        }
    }

    ngOnInit() {

    }

}
