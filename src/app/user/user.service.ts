import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient} from '@angular/common/http';
import { Observable }    from 'rxjs/Observable';
import { User }    from '../commom/models';
import { Config }    from '../commom/config';
import { GenericDatagridResponse, GenericDatagridRequest } from '../commom/datagrid/datagrid.component';
import { GenericSaveRequest, GenericSaveResponse } from '../commom/util';

@Injectable()
export class UserService {

    constructor(private http:HttpClient) {}

    private getApiUrl(str:string): string {
        return Config.currentBase.baseUrl + str;
    }
    
    public login(parameters: {login:String, password: String}): Observable<User> {
        return this.http.post<User>(this.getApiUrl('usuario/login.json'), parameters);
    }
    
    public findByFilter(request: FindByFilterRequest): Observable<FindByFilterResponse> {
        return this.http.post<FindByFilterResponse>(this.getApiUrl('usuarios.json'), request);
    }
    
    public save(request: GenericSaveRequest<User>): Observable<GenericSaveResponse> {
        return this.http.post<GenericSaveResponse>(this.getApiUrl('usuarios.json'), request);
    }

}

export class FindByFilterRequest extends GenericDatagridRequest {
    nome: string
    empresa: number
    sortBy: string
    sortType: string
}

export class FindByFilterResponse extends GenericDatagridResponse<User> {

}