
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
}

export class CallbackEvent {
  static createFunction(esse: any, func: Function): Function {
    let f = function() {
      return func.call(esse, arguments)
    }

    return f;
  }
}
