
export class Client {
    id: Number = null;
    name: String = null;
    cnpj: String = null;
    image: string = null;

    categoryId: number = null;
    cityId: number = null;
    ufSigla: string = null;

    description: string = null;
    importanceOrder: number = 5;

    informations: ClientInformation[] = []
}

export class Importance {
    label: string
    value: number;

    static importances: Importance[] = [
        {label: "Ordem: 0", value: 0},
        {label: "Ordem: 1", value: 1},
        {label: "Ordem: 2", value: 2},
        {label: "Ordem: 3", value: 3},
        {label: "Ordem: 4", value: 4},
        {label: "Ordem: 5", value: 5},
        {label: "Ordem: 6", value: 6},
        {label: "Ordem: 7", value: 7},
        {label: "Ordem: 8", value: 8},
        {label: "Ordem: 9", value: 9},
    ]
}

export class ClientInformation {
    type: string;
    label: string;
    icon: string;
    value: string;
}


export class UserRole {

    constructor(public value: String, public desc: String) {
        
    }
}

export const UserRoles = {ADMIN: new UserRole("ADMIN", "Administrador"), USER: new UserRole("USER", "Usuario comum")}

export class User {
    id: Number = null;
    name: String = null;
    login: String = null;
    password: String = null;
    newPassword?: String = null;

    //Just for ui
    newPasswordRepeated?: String = null;
    citySearch: City = null;

    role: String
    citiesAllowed: City[]
    
    /*companyId: Number = null;
    companyName:String = null;

    profileId: Number = null;
    profileName:String = null;

    get company(): Company {
        return new Company(this.companyId, this.companyName)
    }

    get profile(): Profile {
        return new Profile(this.profileId, this.profileName)
    }*/
}

export class Profile {

    constructor(id?: Number, name?: String) {
        this.id = id
        this.name = name
    }

    id: Number = null
    name: String = null
}

export class Permission {
    id: Number
    groupName: String
    permsName: String

    profileId: Number    
}


export class Category {
    id: Number
    name: String  
}

export class City {
    id: Number
    name: string 
    ufSigla: string;
}

export class State {
    sigla: string
    name: string  
}


export class Company {

    constructor(id?: Number, name?: String) {
        this.id = id
        this.name = name
    }

    id: Number = null
    name: String = null
    cpj: String
    birthday: Date
    address: String
    county: String
    cep: String
    addressNumber: String
    phone1: String
    phone2: String
    email: String
    
    cityId: Number
    companyParentId: Number
}