import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';
import { ListComponent } from '../../util';
import { Column, GenericDatagridResponse, DatagridComponent } from '../../datagrid/datagrid.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-list-template',
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.scss']
})
export class ListTemplateComponent {

    @ViewChild("datagrid")
    public datagrid: DatagridComponent;

    @Input() 
    public filtersTemplateRef: TemplateRef<any>;

    public title: string;
    public datagridColumns: Column[];

    public deleteItemEvent: Function;
    public editItemEvent: Function;
    public addItemEvent: Function;
    public loadDataEvent: Function;
    
    public callGridLoadData() {
        this.datagrid.loadDataFromStart()
    }
    

    public init() {
    }
}
