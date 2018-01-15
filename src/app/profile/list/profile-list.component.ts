import { Component, OnInit, ViewChild } from '@angular/core';
import { ListComponent, Util } from '../../commom/util';
import { GenericDatagridResponse, Column, DatagridComponent } from '../../commom/datagrid/datagrid.component';
import { Observable } from 'rxjs/Observable';
import { DialogService } from '../../commom/dialog/dialog.service';
import { ProfileEditComponent } from '../edit/profile-edit.component';
import { ListTemplateComponent } from '../../commom/templates/list/list-template.component';
import { Profile } from '../../commom/models';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
  providers: [ DialogService ],  
})
export class ProfileListComponent /*extends ListComponent*/ {
    
    constructor(public dialogService: DialogService) {
        //super()
    }

    //----------------------------------------------------------------

    @ViewChild("listTemplate")
    public listTemplate: ListTemplateComponent;

    public datagridColumns: Column[] = [
        {title: "Nome", modelField: "nome", sortable: true}
    ];

    //----------------------------------------------------------------

    public loadData(): Observable<GenericDatagridResponse<any>> {
        let offset = this.listTemplate.datagrid.currentOffset
        let pgSize = this.listTemplate.datagrid.currentPageSize
        let sortFl = this.listTemplate.datagrid.currentSortField
        let sortTp = this.listTemplate.datagrid.currentSortType.valueOf()
        let limitt = offset + pgSize

        let fakeObs = Observable.create(observer => {

            setTimeout(() => {
                let fakeJson = this.fakeProfilesJson
                fakeJson.totalItens = fakeJson.result.length
                fakeJson.result = pgSize == 0 ? fakeJson.result : (fakeJson.result as Array<any>).slice(offset, limitt)
                observer.next(fakeJson)
                observer.complete()
            }, 500)
            
        })
        
        return fakeObs
    }

    protected addItem() {
        this.dialogService.createDialog(ProfileEditComponent, {});
    }

    protected editItem(itemIndex: number) {
        let itemSelected = this.listTemplate.datagrid.dataSource[itemIndex]
        this.dialogService.createDialog(ProfileEditComponent, {entity: itemSelected});
    }

    protected deleteItem(itemIndex: number) {
        let item = this.listTemplate.datagrid.dataSource[itemIndex]
        this.listTemplate.datagrid.dataSource.splice(itemIndex, 1)
    }

    ngOnInit() {
        this.listTemplate.title = "Perfís"
        this.listTemplate.datagridColumns = this.datagridColumns;
        
        this.listTemplate.deleteItemEvent = Util.createCallbackFunction(this, this.deleteItem);
        this.listTemplate.editItemEvent = Util.createCallbackFunction(this, this.editItem);
        this.listTemplate.loadDataEvent = Util.createCallbackFunction(this, this.loadData);
        this.listTemplate.addItemEvent = Util.createCallbackFunction(this, this.addItem);
        
        this.listTemplate.init()
    }


    get fakeProfilesJson(): any {
        return {"status": "OK", "total": 102, "result":[
            new Profile(1, "Tasdfa"),
            new Profile(2, "asdfa"),
            new Profile(3, "Taasdfsdfa"),
            new Profile(4, "Tasfsdfsadfa"),
            new Profile(5, "asdfasdfa"),
            new Profile(6, "adssadfa"),
        ]}
    }

}

