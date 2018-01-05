import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient} from '@angular/common/http';
import { Observable }    from 'rxjs/Observable';
import { Usuario }    from '../commom/models';
import { Config }    from '../commom/config';
import { DatagridResponse } from '../commom/datagrid/datagrid.component';

@Injectable()
export class UserService {

    constructor(private http:HttpClient) {}

    private getApiUrl(str:string): string {
        return Config.currentBase.baseUrl + str;
    }
    
    public login(parameters: {login:String, password: String}): Observable<Usuario> {
        return this.http.post<Usuario>(this.getApiUrl('usuario/login.json'), parameters);
    }
    
    public findByFilter(request: FindByFilterRequest): Observable<FindByFilterResponse> {
        return this.http.post<FindByFilterResponse>(this.getApiUrl('usuarios.json'), request);
    }

}

export class FindByFilterRequest {
    offset: number
    limit:number

    nome: string
    empresa: number
}

export class FindByFilterResponse extends DatagridResponse {
    total: number
    status:string
    result: Usuario[]
}