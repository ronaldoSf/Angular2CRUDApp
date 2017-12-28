
export class Usuario {
    codigo: Number
    nome: String
    login: String
    senha: String

    perfilCod: Number
    empresaCod: Number

    empresaNome:String
    perfilNome:String
}

export class Perfil {
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