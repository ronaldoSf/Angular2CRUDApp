import { Config } from './../config';
import { Injectable } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { ComponentType } from "@angular/cdk/portal";
import { ComponentRef } from '@angular/core/src/linker/component_factory';
import { Component } from '@angular/core/src/metadata/directives';



@Injectable()
export class DialogService {

    constructor(public dialog: MatDialog) { }


    teste() {
        //this.createDialog(UserEditComponent, null)
    }

    createDialog(componentClass: any): DialogComponent {

        let viewModel: typeof DialogComponent = componentClass
        let compType: ComponentType<DialogComponent> = componentClass

        var dialogType = (<typeof DialogComponent> viewModel.constructor)
        var dialogConfig = viewModel.dialogConfig;
        
        if (!dialogConfig) {
            throw new Error("Config não implementado pelo component");
        }
        
        let dialogRef = this.dialog.open(compType, {
            minHeight: dialogConfig.height,
            minWidth: dialogConfig.width,
            data: dialogConfig.data,
            disableClose: !dialogConfig.clickOutsideClosesIt,
        });

        dialogRef.componentInstance.matDialogRef = dialogRef;
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