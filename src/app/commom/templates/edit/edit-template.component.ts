import { Component, OnInit } from '@angular/core';
import { FormConfigRow } from '../../forms/my.form.component';
import { Util } from '../../util';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../../dialog/dialog.service';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss']
})
export class EditTemplateComponent {

    public dialogRef: MatDialogRef<any>
    public windowTitle: string;
    public formConfigs: FormConfigRow<any>[];
    public doSaveEvent: Function
    public entity: Object


    public saveEvent: Function = Util.createCallbackFunction(this,this.save)
    public cancEvent: Function = Util.createCallbackFunction(this,this.cancel)
    
    constructor(public dialogService: DialogService) {
        
    }
    
    cancel() {
        if (this.dialogRef) {
            this.dialogRef.close()            
        }
    }

    init() {

    }

    save() {
        let strErrors: string[] = []
      
        this.formConfigs.forEach((row) => {
            row.formConfigs.forEach((item) => {
              item.createFormControl().markAsDirty()
              let formErrors = item.createFormControl().errors
              let formName: string = item.placeHolder.replace(".", "");
      
                if (formErrors) {
                    Util.objToArray(formErrors).forEach((error) => {
                    strErrors.push(formName + ": " + error + "")         
                    })
                }
              
            })
        })
      
        if (strErrors.length > 0 ) {
            this.dialogService.createDialogMessage(strErrors.join(" <br/> "));
        } else {
            if (this.doSaveEvent) {
                this.doSaveEvent()
            }
        }
    }
}
