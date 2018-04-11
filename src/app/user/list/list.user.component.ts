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
        {title: "Perfil", modelField: new Property<User>("profileName").name, sortable: false},
        {title: "Empresa", modelField: new Property<User>("companyName").name, sortable: false},
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
            "empresa": this.filterEmpresa == null ? null : this.filterEmpresa.id.valueOf(),
            "offset": offset,
            "limit": limitt,
            "sortBy": sortFl,
            "sortType": sortTp,
        }

        let fakeObs = Observable.create(observer => {

            setTimeout(() => {
                let fakeUsersJson = this.fakeUsersJson
                fakeUsersJson.totalItens = fakeUsersJson.result.length
                fakeUsersJson.result = pgSize == 0 ? fakeUsersJson.result : (fakeUsersJson.result as Array<any>).slice(offset, limitt)
                observer.next(fakeUsersJson)
                observer.complete()
            }, 500)
            
        })
        
        //return this.userService.findByFilter(request)
        return fakeObs
    }



    get fakeUsersJson(): any {
        return {"status": "OK", "total": 102, "result":[
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "asdf", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "vbv", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "sdfw"},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "fht", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "jhj", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "iu", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "utys"},
            {"codigo": 1, "nome": "1", "login": "vbv", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "sdfw"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "vbv", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "sdfw"},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "fht", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "jhj", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "iu", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "utys"},
            {"codigo": 1, "nome": "1", "login": "vbv", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "sdfw"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "vbv", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "sdfw"},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "fht", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "jhj", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "iu", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "utys"},
            {"codigo": 1, "nome": "1", "login": "vbv", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "sdfw"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "vbv", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "sdfw"},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "fht", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "jhj", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "iu", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "utys"},
            {"codigo": 1, "nome": "1", "login": "vbv", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "sdfw"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "vbv", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "sdfw"},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "fht", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "jhj", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "iu", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "utys"},
            {"codigo": 1, "nome": "1", "login": "vbv", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "sdfw"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "vbv", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "sdfw"},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "fht", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "jhj", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "iu", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "utys"},
            {"codigo": 1, "nome": "1", "login": "vbv", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "sdfw"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "vbv", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "sdfw"},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "fht", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "jhj", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "iu", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "utys"},
            {"codigo": 1, "nome": "1", "login": "vbv", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "", "perfilNome": "sdfw"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "s", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "76", "perfilNome": "sdfgs"},
            {"codigo": 1, "nome": "1", "login": "asdf", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "lo", "perfilNome": "sdfsdg"},
            {"codigo": 1, "nome": "1", "login": "as", "senha": "", "empresaCod": 1, "perfilCod": 1, "empresaNome": "uyik76", "perfilNome": ""},
        ]}
    }



}