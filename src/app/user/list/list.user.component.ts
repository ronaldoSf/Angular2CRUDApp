import { InputFormConfig } from './../../commom/input.form/input.form.component';
import { FormConfigRow, Property } from './../../commom/forms/my.form.component';
import { DialogService } from './../../commom/dialog/dialog.service';
import { UserEditComponent } from './../edit/edit.user.component';
import {Component, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/primeng';

import {Column, Action, DatagridComponent, GenericDatagridResponse} from '../../commom/datagrid/datagrid.component';

import {User, Company} from '../../commom/models';
import * as Service from '../user.service';
import { Observable } from 'rxjs/Observable';
import { Util, ListComponent } from '../../commom/util';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'list-user',
  templateUrl: './list.user.component.html',
  styleUrls: ['./list.user.component.scss'],
  providers: [ Service.UserService, DialogService ],  
})
export class UserListComponent extends ListComponent {
    
    constructor(private userService: Service.UserService, public dialogService: DialogService) { 
        super()
    }
    
    ngOnInit() {
        
    }

    @ViewChild('datagrid') 
    public datagrid: DatagridComponent;

    public filterName: string = "";
    public filterEmpresa: Company = null;
    
    public datagridColumns: Column[] = [
        {title: "Nome", modelField: new Property<User>("name").name, sortable: true},
        {title: "Login", modelField: new Property<User>("login").name, sortable: true},
        {title: "Cidades", modelField: new Property<User>("citiesStr").name, sortable: true},
    ]

    

    //----------------- CALLBACKS -----------------------------------------------
    
    public deleteItemEvent = Util.createCallbackFunction(this, this.deleteItem);
    public editItemEvent = Util.createCallbackFunction(this, this.editItem);
    public loadDataEvent = Util.createCallbackFunction(this, this.loadData);

    //----------------------- FUNCTIONS ----------------------------------------

    public onBtSearchClick() {
        this.datagrid.loadDataFromStart()
    }

    public addItem() {
        let i = this.dialogService.createDialog(UserEditComponent, {});    
    }

    public editItem(itemIndex: number) {
        let itemSelected = this.datagrid.dataSource[itemIndex]

        let i = this.dialogService.createDialog(UserEditComponent, {entity: itemSelected});
        console.log(i)
    }
    public deleteItem(itemIndex: number) {
        let item = this.datagrid.dataSource[itemIndex]
    }

    public loadData(/*offset: number, limit: number)*/): Observable<GenericDatagridResponse<any>> {
        let offset = this.datagrid.currentOffset
        let pgSize = this.datagrid.currentPageSize
        let sortFl = this.datagrid.currentSortField
        let sortTp = this.datagrid.currentSortType.valueOf()
        let limitt = offset + pgSize
        
        var request: Service.FindByFilterRequest = {
            "nome": this.filterName, 
            //"empresa": this.filterEmpresa == null ? null : this.filterEmpresa.id.valueOf(),
            "offset": offset,
            "limit": limitt,
            "sortBy": sortFl,
            "sortType": sortTp,
        }

        return this.userService.findByFilter(request)
    }

    public onDeleteSelected() {

        let ids = this.datagrid.dataSource
            .filter((item) => item.selected)
            .map((item) => item.id);

        if (ids.length <= 0) {
            return;
        }

        this.userService.remove({ids: ids})
            .subscribe((result) => {
                //console.log("indexes " + indexes)

                ids.forEach((id) => {
                    var itemIndex =  this.datagrid.dataSource.findIndex((item) => item.id == id)
                    this.datagrid.dataSource.splice(itemIndex, 1)                        
                })
                
            }, (error) => {
                this.datagrid.showError(error)
            }, () => {
                this.datagrid.showLoading = false;
            })
    }



}