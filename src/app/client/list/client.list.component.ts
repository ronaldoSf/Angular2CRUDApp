import { getTestBed } from '@angular/core/testing';
import { InputFormConfig } from './../../commom/input.form/input.form.component';
import { FormConfigRow, Property } from './../../commom/forms/my.form.component';
import { DialogService } from './../../commom/dialog/dialog.service';
//import { ClientEditComponent } from './../edit/edit.client.component';
import {Component, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/primeng';

import {Column, Action, DatagridComponent, GenericDatagridResponse} from '../../commom/datagrid/datagrid.component';

import {Client, Company} from '../../commom/models';
import * as Service from '../client.service';
import { Observable } from 'rxjs/Observable';
import { Util, ListComponent } from '../../commom/util';
import { MatDialog } from '@angular/material/dialog';
import { ClientEditComponent } from '../edit/client.edit.component';

@Component({
  selector: 'list-client',
  templateUrl: './client.list.component.html',
  styleUrls: ['./client.list.component.scss'],
  providers: [ Service.ClientService, DialogService ],  
})
export class ClientListComponent extends ListComponent {
     
    constructor(private clientService: Service.ClientService, public dialogService: DialogService) { 
        super()
    }
    
    ngOnInit() {
        
    }

    @ViewChild('datagrid') 
    public datagrid: DatagridComponent;

    public filterName: string = "";
    public filterEmpresa: Company = null;
    
    public datagridColumns: Column[] = [
        {title: "Nome", modelField: new Property<Client>("name").name, sortable: false},
        {title: "CNPJ", modelField: new Property<Client>("cnpj").name, sortable: false},/*
        {title: "Login", modelField: new Property<Client>("login").name, sortable: true},
        {title: "Perfil", modelField: new Property<Client>("profileName").name, sortable: false},
        {title: "Empresa", modelField: new Property<Client>("companyName").name, sortable: false},*/
    ]

    

    //----------------- CALLBACKS -----------------------------------------------
    
    public deleteItemEvent = Util.createCallbackFunction(this, this.deleteItem);
    public editItemEvent = Util.createCallbackFunction(this, this.editItem);
    public loadDataEvent = Util.createCallbackFunction(this, this.loadData);

    //----------------------- FUNCTIONS ----------------------------------------

    protected onDeleteSelected() {

        let ids = this.datagrid.dataSource
            .filter((item) => item.selected)
            .map((item) => item.id);

        if (ids.length <= 0) {
            return;
        }

        this.clientService.remove({ids: ids})
            .subscribe((result) => {
                //console.log("indexes " + indexes)

                ids.forEach((id) => {
                    var itemIndex =  this.datagrid.dataSource.findIndex((item) => item.id == id)
                    this.datagrid.dataSource.splice(itemIndex, 1)                        
                })
                
                //console.log("dataSource " + this.datagrid.dataSource)
            }, (error) => {
                this.datagrid.showError(error)
            }, () => {
                this.datagrid.showLoading = false;
            })
    }

    protected onBtSearchClick() {
        this.datagrid.loadDataFromStart()
    }

    protected addItem() {
        let i = this.dialogService.createDialog(ClientEditComponent, {});    
    }

    protected editItem(itemIndex: number) {
        let itemSelected = this.datagrid.dataSource[itemIndex]

        let i = this.dialogService.createDialog(ClientEditComponent, {entity: itemSelected});
        console.log(i)
    }
    protected deleteItem(itemIndex: number) {
        //console.log("itemIndex " + itemIndex)
        let item = this.datagrid.dataSource[itemIndex]
        
        this.datagrid.showLoading = true;
        
        this.clientService.remove({ids: [item.id]})
            .subscribe((result) => {
                this.datagrid.dataSource.splice(itemIndex)
            }, (error) => {
                this.datagrid.showError(error)
            }, () => {
                this.datagrid.showLoading = false;
            })
    }

    public loadData(/*offset: number, limit: number)*/): Observable<GenericDatagridResponse<any>> {
        let offset = this.datagrid.currentOffset
        let pgSize = this.datagrid.currentPageSize
        let sortFl = this.datagrid.currentSortField
        let sortTp = this.datagrid.currentSortType.valueOf()
        let limitt = pgSize
        
        var request: Service.FindByFilterRequest = {
            "name": this.filterName, 
            "empresa": this.filterEmpresa == null ? null : this.filterEmpresa.id.valueOf(),
            "offset": offset,
            "limit": limitt,
            "sortBy": sortFl,
            "sortType": sortTp,
        }

        /*let fakeObs = Observable.create(observer => {

            setTimeout(() => {
                let fakeClientsJson = this.fakeClientsJson
                fakeClientsJson.totalItens = fakeClientsJson.result.length
                fakeClientsJson.result = pgSize == 0 ? fakeClientsJson.result : (fakeClientsJson.result as Array<any>).slice(offset, limitt)
                observer.next(fakeClientsJson)
                observer.complete()
            }, 500)
            
        })
        
        return fakeObs*/
        
        return this.clientService.findByFilter(request)
    }


}