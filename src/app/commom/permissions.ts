import { Injectable } from "@angular/core";
import { Util } from "./util";

export abstract class GROUP_PERMISSION {
    readonly GROUP: String
    abstract readonly PERMISSIONS: PERMISSION[]

    constructor(GROUP:String) {
        this.GROUP = GROUP
    }
}

export class PERMISSION {
    constructor (public KEY:String, public GROUP: GROUP_CRUD_PERMISSION) { }

    public toString(): String {
        this.teste(typeof(this.GROUP));
        return this.KEY + "-" + this.GROUP.GROUP;
    }

    public teste(a: String) {
        console.log("TPE:" + a);
    }
}

export class GROUP_CRUD_PERMISSION extends GROUP_PERMISSION {
    readonly LIST: PERMISSION = new PERMISSION("LIST", this); // + "_" + this.GROUP;
    readonly SHOW: PERMISSION = new PERMISSION("SHOW", this); // + "_" + this.GROUP;
    readonly EDIT: PERMISSION = new PERMISSION("EDIT", this); // + "_" + this.GROUP;
    readonly ADDD: PERMISSION = new PERMISSION("ADDD", this); // + "_" + this.GROUP;
    readonly REMV: PERMISSION = new PERMISSION("REMV", this); // + "_" + this.GROUP;
    
    readonly PERMISSIONS = [this.SHOW, this.EDIT, this.ADDD, this.REMV];
}

export namespace PERMISSIONS {

    export class USUARIO extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("USUARIO");
    }
    export class PERMISSAO extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("PERMISSAO");
    }
    export class AGENDAMENTO extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("AGENDAMENTO");
    }
    export class BANCO extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("BANCO");
    }
    export class CAIXA extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("CAIXA");
    }
    export class CENTRO_CUSTO extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("CENTRO_CUSTO");
    }
    export class CIDADE extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("CIDADE");
    }
    export class CLIENTE extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("CLIENTE");
    }
    export class CONTA_RECEBER extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("CONTA_RECEBER");
    }
    export class CONTA_PAGAR extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("CONTA_PAGAR");
    }
    export class CONTA_BANCARIA extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("CONTA_BANCARIA");
    }
    export class CONTRATO extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("PERMISSION");
    }
    export class CREDENCIADO extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("PERMISSION");
    }
    export class EMPRESA extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("PERMISSION");
    }
    export class ESPECIALIDADE extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("PERMISSION");
    }
    export class ESTADO extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("PERMISSION");
    }
    export class EXCEAXO_VALOR extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("PERMISSION");
    }
    export class FORMA_PGTO extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("PERMISSION");
    }
    export class PAGAMENTO extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("PERMISSION");
    }
    export class PERFIL extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("PERMISSION");
    }
    export class PLANO extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("PERMISSION");
    }
    export class PLANO_VALOR extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("PERMISSION");
    }
    export class PRESTADOR extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("PERMISSION");
    }
    export class PROCEDIMENTO extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("PERMISSION");
    }
    export class REGRA extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("PERMISSION");
    }
    export class REP_COMERCIAL extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("PERMISSION");
    }
    export class TAB_FATURAMENTO extends GROUP_CRUD_PERMISSION {
        static readonly instance = new GROUP_CRUD_PERMISSION("PERMISSION");
    }
}