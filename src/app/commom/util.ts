import { Column, GenericDatagridResponse, DatagridComponent } from "./datagrid/datagrid.component";
import { Observable } from "rxjs/Observable";
import { DialogComponent } from "./dialog/dialog.service";
import { FormConfigRow } from "./forms/my.form.component";


export class Util {

    
    static readonly Masks = class {
        public static readonly cpf: string = "000.000.000-00";
    }

    public static getItensFromObject(obj: object): Array<any> {

        let itens: Array<any> = [];

        for(var p in obj) {
            itens.push(p)
        }

        return itens;
    }

    public static get(fn, or) {
        try {
            return fn();
        } catch (e) {
            return or;
        }
    }

    public static setDeepValue(obj: Object, value: any, path: string | string[]) {
        
        if (typeof path === "string") {
            path = path.split('.');
        }
    
        if(path.length > 1) {
            var prop = path.shift();

            if(obj[prop] == null || typeof obj[prop] !== 'object'){
                obj[prop] = {};
            }

            Util.setDeepValue(obj[prop], value, path);
        } else {
            var prop = path.shift();
            obj[prop] = value;
        }
    }

    public static getDeepValue(obj: Object, path: string | string[]): any {
        
        if (typeof path === "string") {
            path = path.split('.');
        }
    
        if(path.length > 1) {
            var prop = path.shift();

            if(obj[prop] == null || typeof obj[prop] !== 'object'){
                obj[prop] = {};
            }

            return Util.getDeepValue(obj[prop], path);
        } else {
            var prop = path.shift();
            return obj[prop]
        }
    }

    public static objToArray(obj: any): any[] {
        if (Array.isArray(obj)) {
            return obj
        } else {
            return Object.keys(obj).map(function(index) {
                var item = obj[index];
                return item;
            });
        }
    }

    public static truncate(num, places = 2) {
        return Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places);
    }

    static createCallbackFunction(esse: any, func: Function): Function {
        let f = function() {
          //console.log("arguments" + arguments)
          return func.apply(esse, arguments)
        }
    
        return f;
    }
    
}

export class GenericSaveResponse {
    status: string;
    id: number;    
}


export class GenericSaveRequest<T> {
    model: T;
}

export class GenericRemoveRequest {
    ids: number[]
}

export class GenericRemoveResponse {
    status: string;
    ids: number[]
}

export class GenericFindByIdRequest {
    id: number
}

export class GenericFindByIdResponse<T> {
    status: string;
    response: T;
}

export abstract class ListComponent {
    public abstract datagridColumns: Column[]
    public abstract loadData(): Observable<GenericDatagridResponse<any>>
    public abstract datagrid: DatagridComponent;

    public abstract deleteItemEvent: Function;
    public abstract editItemEvent: Function;
    public abstract loadDataEvent: Function;

    protected abstract addItem()
    protected abstract editItem(itemIndex: number)
    protected abstract deleteItem(itemIndex: number)
    protected abstract onBtSearchClick()
}


export abstract class EditComponent extends DialogComponent {
    abstract save()
    abstract cancel()
    abstract windowTitle: string
    abstract formConfigs: FormConfigRow<any>[]
}

/*
Object["toArray"] = function() {
    return Util.objToArray(this);
};

Object["toArray"] = function() {
    return Util.objToArray(this);
};*/