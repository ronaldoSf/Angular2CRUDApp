
export class Util {
    public static getItensFromObject(obj: object): Array<any> {

      let itens: Array<any> = [];

      for(var p in obj) {
        itens.push(p)
      }

      return itens;
    }
}
