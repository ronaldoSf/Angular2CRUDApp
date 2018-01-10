import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss']
})
export class DatagridComponent implements OnInit {

    constructor() { }
    
    ngOnInit() {
        if (this.pageSizes.length > 1 && this.pageSizes[0] == 0) {
            this.currentPageSize = this.pageSizes[1]
        } else if (this.pageSizes.length > 0 && this.pageSizes[0] != 0) {
            this.currentPageSize = this.pageSizes[0]
        }
    }

    private lastToggleSelects: Boolean = false
    private totalOfPages: number = 0
    
    @Input()
    public pageSizes:number[] = [0, 5, 10, 20] //Zero is All
    
    @Input()
    public noItemMessage: string = "Nenhum item"
    
    @Input()
    public currentPageSize: number = 0;
    
    @Input()
    public currentPage: number = 0;
    
    @Input()
    public columns:Column[] = []
    
    @Input()
    public dataSource:any[] = []

    @Input()
    public showSelections:Boolean = true
    
    /*@Output()
    public loadEvent = new EventEmitter();
    
    @Output()
    public errorEvent = new EventEmitter();*/
    
    @Input()
    public loadCallback: Function
    
    @Input()
    public errorCallback: Function
    
    @Input()
    public actions: Action[] = [
        {title: "Editar", icon: "mode_edit"},
        {title: "Excluir", icon: "delete"}
    ]

    @Input()
    public actionsCallbacks: Function[] = [
            function() { alert("aaaaa") },
            function() { alert("bbbbb") }
    ]

    public loadDataFromStart() {
        this.currentPage = 0
        this.loadData()
    }
    
    public get canGoNextPage():Boolean {
        let newPage = this.currentPage + 1

        if (this.totalOfPages == 0 || this.totalOfPages > newPage) {
            return true
        } else {
            return false
        }
    }

    public get canGoBackPage():Boolean {
        let newPage = this.currentPage - 1

        if (this.totalOfPages == 0 || newPage >= 0) {
            return true
        } else {
            return false
        }
    }
    
    private goNextPage() {
        let newPage = this.currentPage + 1
        
        if (this.canGoNextPage) {
            this.currentPage = newPage;
            this.loadData()
        }
    }
        
    private goBackPage() {
        let newPage = this.currentPage - 1
        
        if (this.canGoBackPage) {
            this.currentPage = newPage;
            this.loadData()
        }
    }

    private loadData() {
        this.dataSource = [];
        
        if (this.loadCallback) {
            let observable: Observable<GenericDatagridResponse<any>> = this.loadCallback()
            observable.subscribe(
                result => { 
                    if (result.status == "OK") {
                        this.dataSource = result.result 
                        this.totalOfPages = result.total
                    } else {
                        this.showError(result.status)
                    }
                },
                error => { 
                    this.showError(error)
                }
            )
        }
    }

    private showError(error: any) {
        if (this.errorCallback) {
            this.errorCallback(error)
        } else {
            alert("Erro ao carregar dados")
        }
    }

    public toggleAllSelects() {
        this.lastToggleSelects = !this.lastToggleSelects;

        for (let item of this.dataSource) {
            item.selected = this.lastToggleSelects;
        }
    }

    private callAction(actionIndex: number, modelIndex: number) {
        let action = this.actions[actionIndex]
        let item = this.dataSource[modelIndex]
        let actionCallBack = this.actionsCallbacks[actionIndex];

        if (action.action) {
            action.action(modelIndex)
            return
        }
        if (actionCallBack) {
            actionCallBack(modelIndex)
            return
        }
    }

    private makeDescriptionForModel(item: Object, column: Column) {  
        let value = item[column.column.toString()]

        if (column.format) {
            return column.format(value)
        }

        if (column.itemReplace) {
        for (let item of column.itemReplace) {
            if (item.from == value) {
            return item.to
            }
        }

        return ""
        }

        return value
    }

}


export class Column {
  title:String
  column:String
  sortable?: Boolean = false
  format?: Function
  itemReplace?: {from:String, to: String}[]
}

export class Action {
  title: string
  icon: string
  action?: Function
}

export abstract class GenericDatagridResponse<T> {
    total: number
    status: string
    result: T[]
}

export abstract class GenericDatagridRequest {
    offset: number
    limit:number
}
