
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
