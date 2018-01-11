import { Component, OnInit } from '@angular/core';
import { ListComponent, Util } from '../../commom/util';
import { GenericDatagridResponse, Column, DatagridComponent } from '../../commom/datagrid/datagrid.component';
import { Observable } from 'rxjs/Observable';
import { ViewChild } from '@angular/core/src/metadata/di';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent extends ListComponent {
    
    public datagridColumns: Column[] = [
        {title: "Nome", modelField: "nome", sortable: true}
    ];


    public deleteItemEvent = Util.createCallbackFunction(this, this.deleteItem);
    public editItemEvent = Util.createCallbackFunction(this, this.editItem);
    public loadDataEvent = Util.createCallbackFunction(this, this.loadData);

    @ViewChild("datagrid")
    public datagrid: DatagridComponent;

    public loadData(): Observable<GenericDatagridResponse<any>> {
        throw new Error("Method not implemented.");
    }

    protected addItem() {
        throw new Error("Method not implemented.");
    }

    protected editItem(itemIndex: number) {
        throw new Error("Method not implemented.");
    }

    protected deleteItem(itemIndex: number) {
        throw new Error("Method not implemented.");
    }

    protected onBtSearchClick() {
        throw new Error("Method not implemented.");
    }

    constructor() {
        super()
    }

    ngOnInit() {
        
    }

}
