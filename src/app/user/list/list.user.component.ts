import { InputFormConfig } from './../../commom/input.form/input.form.component';
import { FormConfigRow } from './../../commom/forms/my.form.component';
import { DialogService } from './../../commom/dialog/dialog.service';
import { UserEditComponent } from './../edit/edit.user.component';
import {Component, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/primeng';

import {Column, Action, DatagridComponent, DatagridResponse} from '../../commom/datagrid/datagrid.component';

import {Usuario, Empresa} from '../../commom/models';
import * as Service from '../user.service';
import { Observable } from 'rxjs/Observable';
import { CallbackEvent, Util } from '../../commom/util';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'list-user',
  templateUrl: './list.user.component.html',
  styleUrls: ['./list.user.component.scss'],
  providers: [ Service.UserService, DialogService ],  
})
export class UserListComponent {
    
    constructor(private userService: Service.UserService, public dialogService: DialogService) { 
        
    }
    
    ngOnInit() {
        
    }

    @ViewChild('datagrid') 
    public datagrid: DatagridComponent;

    public filterName: string = "";
    public filterEmpresa: Empresa = null;
    
    public datagridColumns: Column[] = [
        {title: "Nome", column: Util.propertyOf<Usuario>("nome"), sortable: true},
        {title: "Login", column: Util.propertyOf<Usuario>("login"), sortable: false},
        {title: "Perfil", column: Util.propertyOf<Usuario>("perfilNome"), sortable: false},
        {title: "Empresa", column: Util.propertyOf<Usuario>("empresaNome"), sortable: false},
    ]

    

    //----------------- CALLBACKS -----------------------------------------------
    
    public deleteItemEvent = CallbackEvent.createFunction(this, this.deleteItem);
    public editItemEvent = CallbackEvent.createFunction(this, this.editItem);
    public loadDataEvent = CallbackEvent.createFunction(this, this.loadData);

    //----------------------- FUNCTIONS ----------------------------------------

    private onBtSearchClick() {
        this.datagrid.loadDataFromStart()
    }

    private addItem() {
        let i = this.dialogService.createDialog(UserEditComponent);    
    }

    private editItem(itemIndex: number) {
        let item = this.datagrid.dataSource[itemIndex]

        let i = this.dialogService.createDialog(UserEditComponent);
        console.log(i)
    }
    private deleteItem(itemIndex: number) {
        let item = this.datagrid.dataSource[itemIndex]
    }

    public loadData(): Observable<DatagridResponse> {
        let offset = this.datagrid.currentOffset
        let limit = this.datagrid.currentOffset + this.datagrid.currentPageSize

        var request: Service.FindByFilterRequest = {
        "nome": this.filterName, 
        "empresa": this.filterEmpresa == null ? null : this.filterEmpresa.codigo.valueOf(),
        "offset": offset,
        "limit": limit
        }
        
        return this.userService.findByFilter(request)
    }

}