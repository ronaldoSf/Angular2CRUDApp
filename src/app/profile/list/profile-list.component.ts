import { Component, OnInit, ViewChild } from '@angular/core';
import { ListComponent, Util } from '../../commom/util';
import { GenericDatagridResponse, Column, DatagridComponent } from '../../commom/datagrid/datagrid.component';
import { Observable } from 'rxjs/Observable';
import { DialogService } from '../../commom/dialog/dialog.service';
import { ProfileEditComponent } from '../edit/profile-edit.component';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
  providers: [ DialogService ],  
})
export class ProfileListComponent extends ListComponent {
    

    constructor(public dialogService: DialogService) { 
        super()
    }

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
        let i = this.dialogService.createDialog(ProfileEditComponent, {});    
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

    ngOnInit() {
        
    }

}
