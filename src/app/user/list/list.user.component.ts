import { InputFormConfig } from './../../commom/input.form/input.form.component';
import { FormConfigRow } from './../../commom/forms/my.form.component';
import { DialogService } from './../../commom/dialog/dialog.service';
import { UserEditComponent } from './../edit/edit.user.component';
import {Component, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/primeng';

import {Column, Action, DatagridComponent, GenericDatagridResponse} from '../../commom/datagrid/datagrid.component';

import {Usuario, Empresa} from '../../commom/models';
import * as Service from '../user.service';
import { Observable } from 'rxjs/Observable';
import { Util } from '../../commom/util';
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
    
    public deleteItemEvent = Util.createCallbackFunction(this, this.deleteItem);
    public editItemEvent = Util.createCallbackFunction(this, this.editItem);
    public loadDataEvent = Util.createCallbackFunction(this, this.loadData);

    //----------------------- FUNCTIONS ----------------------------------------

    private onBtSearchClick() {
        this.datagrid.loadDataFromStart()
    }

    private addItem() {

        let fakeUser: Usuario = {codigo: 1, nome: "a", login: "s", senha: "d", perfilCod: 1, empresaCod: 2, perfilNome: "", empresaNome: "", empresa: null, perfil: null}
        
        let i = this.dialogService.createDialog(UserEditComponent, {entity: fakeUser});    
    }

    private editItem(itemIndex: number) {
        let itemSelected = this.datagrid.dataSource[itemIndex]

        let i = this.dialogService.createDialog(UserEditComponent, {entity: itemSelected});
        console.log(i)
    }
    private deleteItem(itemIndex: number) {
        let item = this.datagrid.dataSource[itemIndex]
    }

    public loadData(/*offset: number, limit: number)*/): Observable<GenericDatagridResponse<any>> {
        let offset = this.datagrid.currentOffset
        let pgSize = this.datagrid.currentPageSize
        let limitt = offset + pgSize
        
        var request: Service.FindByFilterRequest = {
            "nome": this.filterName, 
            "empresa": this.filterEmpresa == null ? null : this.filterEmpresa.codigo.valueOf(),
            "offset": offset,
            "limit": limitt
        }

        let fakeObs = Observable.create(observer => {

            setTimeout(() => {
                let fakeUsersJson = this.fakeUsersJson
                fakeUsersJson.totalItens = fakeUsersJson.result.length
                fakeUsersJson.result = (fakeUsersJson.result as Array<any>).slice(offset, limitt)
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