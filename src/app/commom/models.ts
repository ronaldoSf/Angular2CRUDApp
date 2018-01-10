
export class Usuario {
    codigo: Number = null;
    nome: String = null;
    login: String = null;
    senha: String = null;
    novaSenha?: String = null;
    
    empresaCod: Number = null;
    empresaNome:String = null;

    perfilCod: Number = null;
    perfilNome:String = null;

    get empresa(): Empresa {
        return new Empresa(this.empresaCod, this.empresaNome)
    }

    get perfil(): Perfil {
        return new Perfil(this.perfilCod, this.perfilNome)
    }

    /*testeData?:Date = new Date()
    testeCpf?: string = ""
    testeEmpresa?: Empresa
    testePerfil?: Perfil
    testeNumber?: number = 80.798*/
}

export class Perfil {

    constructor(codigo: Number, nome: String) {
        this.codigo = codigo
        this.nome = nome
    }

    codigo: Number
    nome: String
}

export class Permissao {
    codigo: Number
    grupo: String
    nome: String

    perfilCod: Number    
}


export class Empresa {

    constructor(codigo: Number, nome: String) {
        this.codigo = codigo
        this.nome = nome
    }

    codigo: Number
    nome: String
    cpj: String
    dtNascimento: Date
    rua: String
    bairro: String
    cep: String
    numeroCasa: String
    telefone1: String
    telefone2: String
    email: String
    
    cidadeCod: Number
    matrizCod: Number
}