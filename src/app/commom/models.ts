
export class Client {
    id: Number = null;
    name: String = null;
    cnpj: String = null;
    image: string = "https://static.independent.co.uk/s3fs-public/styles/story_medium/public/thumbnails/image/2016/10/11/14/beats-logo-1200-80.jpg";
    description: string = null;
    isFavorite: Boolean = false;
    importanceOrder: number = 1;

    informations: ClientInformation[] = [
		{label: "Telefone", type: "PHONE", icon: "phone", value: "a"},
		{label: "Facebook", type: "FACEBOOK", icon: "face", value: ""},
		{label: "Website" , type: "WEBSITE", icon: "web", value: ""},
		{label: "Endereço", type: "ADDRESS", icon: "place", value: ""},
	]
;
}

export class ClientInformation {
    type: string;
    label: string;
    icon: string;
    value: string;
}

export class User {
    id: Number = null;
    name: String = null;
    login: String = null;
    password: String = null;
    newPassword?: String = null;
    
    companyId: Number = null;
    companyName:String = null;

    profileId: Number = null;
    profileName:String = null;

    get company(): Company {
        return new Company(this.companyId, this.companyName)
    }

    get profile(): Profile {
        return new Profile(this.profileId, this.profileName)
    }
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