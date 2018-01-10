import { Config } from './../config';
import { Injectable } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { ComponentType } from "@angular/cdk/portal";
import { ComponentRef } from '@angular/core/src/linker/component_factory';
import { Component } from '@angular/core/src/metadata/directives';
import { DialogMessageComponent } from '../dialog.message/dialog-message-component.component';



@Injectable()
export class DialogService {

    constructor(public dialogService: MatDialog) { }


    teste() {
        //this.createDialog(UserEditComponent, null)
    }

    createDialog(componentClass: any, data: Object = {}): DialogComponent {

        let viewModel: typeof DialogComponent = componentClass
        let compType: ComponentType<DialogComponent> = componentClass

        var dialogType = (<typeof DialogComponent> viewModel.constructor)
        var dialogConfig = viewModel.dialogConfig;
        
        if (!dialogConfig) {
            throw new Error("Config não implementado pelo component");
        }
        
        let dialogRef = this.dialogService.open(compType, {
            height: dialogConfig.height,
            width: dialogConfig.width,
            minHeight: dialogConfig.minHeight,
            minWidth: dialogConfig.minWidth,
            data: data,
            disableClose: !dialogConfig.clickOutsideClosesIt,
        });

        dialogRef.componentInstance.matDialogRef = dialogRef;
        return dialogRef.componentInstance;
    }


    public createDialogMessage(message: string, buttonMessage: string = "Ok", callBack: Function = null) {
    
        let dialogRef = this.dialogService.open(DialogMessageComponent, {
            height: "auto",
            width: "auto",
            data: {},
            disableClose: true,
        });

        dialogRef.componentInstance.matDialogRef = dialogRef;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.buttonMessage = buttonMessage
        dialogRef.componentInstance.callBack = callBack

        return dialogRef.componentInstance;
    }

}

export abstract class DialogComponent {
    public static dialogConfig: DialogConfig = null;
    public matDialogRef: MatDialogRef<DialogComponent>;

    public closeModal() {
        if (this.matDialogRef) {
            this.matDialogRef.close()
        }
    }
}

export class DialogConfig {

    public width: string;
    public height: string;
    public minWidth?: string;
    public minHeight?: string;
    public clickOutsideClosesIt?: boolean = false
    public data?: any
}




/*
export interface CType<T> {
    new (...args: any[]): T;
}

const decorate = () => (target: typeof DialogComponent) =>
{
    return class Lion extends target
    {
        public Roar = () => console.log("Roaar")
    }
}



interface DialogConfigConstructor {
    dialogConfig: () => DialogConfig;
}

const Testd: DialogConfigConstructor = class Testddd {

    static dialogConfig = function (): DialogConfig {
        return {height: 0, width: 0}; 
    }
}*/