
export class Util {

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
    static readonly Masks = class {
        public static readonly cpf: string = "000.000.000-00";
    }
    

    public static readonly propertyOf = <TObj>(name: keyof TObj) => name;

}

export class CallbackEvent {
  static createFunction(esse: any, func: Function): Function {
    let f = function() {
      return func.call(esse, arguments)
    }

    return f;
  }
}
/*
Object["toArray"] = function() {
    return Util.objToArray(this);
};

Object["toArray"] = function() {
    return Util.objToArray(this);
};*/