import {Util} from './util'
import {User} from './models'
import {PERMISSION, PERMISSIONS, GROUP_PERMISSION} from './permissions'

export class MenuItem {
    label: string;
    items?: MenuItem[] = [];

    permission?: PERMISSION;
    icon?: string;
    url?: string;
}

export class DataBase {
    name: String;
    baseUrl: String;
    baseDomain: String;
}

export class Config {

    static currentUser: User;
    //static currentBase: DataBase = { name: "Produção", baseUrl: "http://localhost:80/api/AgendaSucesso/public" };
    static currentBase: DataBase = { name: "Produção", baseUrl: "http://localhost/Angular2CrudApp/api/AgendaSucesso/public", baseDomain: "http://localhost" };

    static readonly allPermissions: GROUP_PERMISSION[] = Util.getItensFromObject(PERMISSION)
    static readonly allDataBases: DataBase[] = [
        { name: "Produção", baseUrl: "http://localhost:80/Angular2CRUDApp/src/mocks/", baseDomain: "" },
        { name: "Teste", baseUrl: "http://localhost:80/Angular2CRUDApp/src/mocks/", baseDomain: "" },
        { name: "Local", baseUrl: "http://localhost:80/Angular2CRUDApp/src/mocks/", baseDomain: "" },
    ]
    static readonly allMenus: MenuItem[] = [
        {
            label: 'Home',
            icon: 'home',
            items: [
                { label: "Home", icon: "home", url:"", permission: null},                
            ]
        },
        {
            label: 'Pessoas',
            icon: 'person',
            items: [
              { label: "Usuários", icon: "person", url:"/usuario", permission: PERMISSIONS.USUARIO.instance.LIST},
              { label: "Clientes", icon: "person", url:"/usuario", permission: PERMISSIONS.CLIENTE.instance.LIST},
              { label: "Credenciados", icon: "person", url:"/usuario", permission: PERMISSIONS.CREDENCIADO.instance.LIST},
              { label: "Empresas", icon: "person", url:"/usuario", permission: PERMISSIONS.EMPRESA.instance.LIST},
              { label: "Prestadores", icon: "person", url:"/usuario", permission: PERMISSIONS.PRESTADOR.instance.LIST},
              { label: "Rep comerciais", icon: "person", url:"/usuario", permission: PERMISSIONS.REP_COMERCIAL.instance.LIST},
            ]
        },
        {
            label: 'Financeiro',
            icon: 'monetization-on',
            items: [
              { label: "Bancos", icon: "monetization_on", url:"/usuario", permission: PERMISSIONS.USUARIO.instance.LIST},
              { label: "Caixas", icon: "monetization_on", url:"/usuario", permission: PERMISSIONS.CLIENTE.instance.LIST},
              { label: "Centros de custo", icon: "monetization_on", url:"/usuario", permission: PERMISSIONS.CREDENCIADO.instance.LIST},
              { label: "Contas a receber", icon: "monetization_on", url:"/usuario", permission: PERMISSIONS.EMPRESA.instance.LIST},
              { label: "Contas a pagar", icon: "monetization_on", url:"/usuario", permission: PERMISSIONS.PRESTADOR.instance.LIST},
              { label: "Contas bancárias", icon: "monetization_on", url:"/usuario", permission: PERMISSIONS.REP_COMERCIAL.instance.LIST},
              { label: "Formas de pagamento", icon: "monetization_on", url:"/usuario", permission: PERMISSIONS.REP_COMERCIAL.instance.LIST},
            ]
        },
        {
            label: 'Contrato',
            icon: 'monetization-on',
            items: [
              { label: "Agendamentos", icon: "assignment", url:"/usuario", permission: PERMISSIONS.USUARIO.instance.LIST},
              { label: "Contratos", icon: "assignment", url:"/usuario", permission: PERMISSIONS.CLIENTE.instance.LIST},
              { label: "Planos", icon: "assignment", url:"/usuario", permission: PERMISSIONS.CREDENCIADO.instance.LIST},
            ]
        },
        {
            label: 'Faturamento',
            icon: 'monetization-on',
            items: [
              { label: "Especialidades", icon: "local_hospital", url:"/usuario", permission: PERMISSIONS.USUARIO.instance.LIST},
              { label: "Procedimentos", icon: "local_hospital", url:"/usuario", permission: PERMISSIONS.CLIENTE.instance.LIST},
              { label: "Tabelas de faturamento", icon: "local_hospital", url:"/usuario", permission: PERMISSIONS.CREDENCIADO.instance.LIST},
              { label: "Regras", icon: "local_hospital", url:"/usuario", permission: PERMISSIONS.CLIENTE.instance.LIST},
              { label: "Procedimentos", icon: "local_hospital", url:"/usuario", permission: PERMISSIONS.CLIENTE.instance.LIST},
              { label: "Excecões de valor", icon: "local_hospital", url:"/usuario", permission: PERMISSIONS.CLIENTE.instance.LIST},
            ]
        },
        {
            label: 'Logradouro',
            icon: 'monetization-on',
            items: [
              { label: "Estados", icon: "location_on", url:"/usuario", permission: PERMISSIONS.USUARIO.instance.LIST},
              { label: "Cidades", icon: "location_on", url:"/usuario", permission: PERMISSIONS.CLIENTE.instance.LIST},
            ]
        },
        {
            label: 'Outros',
            icon: 'monetization-on',
            items: [
              { label: "Perfís", icon: "settings", url:"/perfil", permission: PERMISSIONS.PERFIL.instance.LIST},
              { label: "Configurações", icon: "settings", url:"/usuario", permission: PERMISSIONS.CLIENTE.instance.LIST},
            ]
        }
      ]; 
}