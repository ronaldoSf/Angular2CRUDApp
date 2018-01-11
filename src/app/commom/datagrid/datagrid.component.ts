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
    private totalOfItens: number = 0


    public showLoading: boolean = false
    
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
    
    @Input()
    public currentSortField: string = null
        
    @Input()
    public currentSortType: SortType = SortType.ASC
    
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
        this.currentPage = 1
        this.loadData()
    }
    
    public get canGoNextPage():Boolean {
        let newPage = this.currentPage + 1

        if (this.totalOfItens != 0 && (newPage * this.currentPageSize) < this.totalOfItens) {
            return true
        } else {
            return false
        }
    }

    public get canGoBackPage():Boolean {
        let newPage = this.currentPage - 1
        
        if (this.totalOfItens != 0 && newPage >= 0) {
            return true
        } else {
            return false
        }
    }

    public get currentOffset(): number {
        return (this.currentPage * this.currentPageSize)
    }

    private get totalOfPages(): number {
        return Math.trunc( this.currentPageSize == 0 ? 1 : (this.totalOfItens / this.currentPageSize))
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

    private pageSizeSelected() {

        if (this.currentPage > this.totalOfPages) {
            this.currentPage = this.totalOfPages
        }

        this.loadData()
    }

    public loadedPage: number = 0;
    public loadedPageSize: number = 0;
    
    private loadData() {
        this.dataSource = [];
        
        if (this.loadCallback) {
            this.showLoading = true;
            
            let observable: Observable<GenericDatagridResponse<any>> = this.loadCallback()
            observable.subscribe(
                result => { 
                    this.showLoading = false;

                    if (result.status == "OK") {
                        this.dataSource = result.result
                        this.loadedPage = this.currentPage
                        this.loadedPageSize = this.currentPageSize
                        this.totalOfItens = result.total
                    } else {
                        this.showError(result.status)
                    }
                },
                error => { 
                    this.showLoading = false;
                    this.showError(error)
                }
            )
        }
    }

    private selectColumnToSort(column: Column) {

        if (this.currentSortField != column.modelField) {
            this.currentSortType = SortType.ASC
        } else {
            this.currentSortType =  this.currentSortType == SortType.ASC ? SortType.DSC : SortType.ASC      
        }

        this.currentSortField = column.modelField
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
        let value = item[column.modelField.toString()]

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
  title: string
  modelField: string
  sortable?: Boolean = false
  format?: Function
  itemReplace?: {from: string, to: string}[]
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

export enum SortType {
    ASC = "ASC",
    DSC = "DESC",
}