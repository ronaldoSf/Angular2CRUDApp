import {Component, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/primeng';

import {Column, Action, DatagridComponent, DatagridResponse} from '../../commom/datagrid/datagrid.component';

import {Usuario, Empresa} from '../../commom/models';
import * as Service from '../user.service';
import { Observable } from 'rxjs/Observable';
import { CallbackEvent, Util } from '../../commom/util';

@Component({
  selector: 'list-user',
  templateUrl: './list.user.component.html',
  styleUrls: ['./list.user.component.scss'],
  providers: [ Service.UserService ],  
})
export class ListUserComponent {
  
  constructor(private userService: Service.UserService) { 

  }
  
  ngOnInit() {
    
  }

  @ViewChild('datagrid') 
  public datagrid: DatagridComponent;

  public filterName: string = "";
  public filterEmpresa: Empresa = null;
  
  public datagridColumns: Column[] = [
    {title: "Nome", column: propertyOf<Usuario>("nome"), sortable: true},
    {title: "Login", column: propertyOf<Usuario>("login"), sortable: false},
    {title: "Perfil", column: propertyOf<Usuario>("perfilNome"), sortable: false},
    {title: "Empresa", column: propertyOf<Usuario>("empresaNome"), sortable: false},
  ]

 

  //-----------------CALLBACKS -----------------------------------------------
  
  public deleteItemEvent = CallbackEvent.createFunction(this, this.deleteItem);
  public editItemEvent = CallbackEvent.createFunction(this, this.editItem);
  public loadDataEvent = CallbackEvent.createFunction(this, this.loadData);

  //----------------------- FUNCTIONS ----------------------------------------

  private onBtSearchClick() {
    this.datagrid.loadDataFromStart()
  }

  private editItem(itemIndex: number) {
    let item = this.datagrid.dataSource[itemIndex]
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


const propertyOf = <TObj>(name: keyof TObj) => name;
