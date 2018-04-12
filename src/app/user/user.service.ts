import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient} from '@angular/common/http';
import { Observable }    from 'rxjs/Observable';
import { User }    from '../commom/models';
import { Config }    from '../commom/config';
import { GenericDatagridResponse, GenericDatagridRequest } from '../commom/datagrid/datagrid.component';
import { GenericSaveRequest, GenericSaveResponse, GenericFindByIdRequest, GenericFindByIdResponse, GenericRemoveRequest, GenericRemoveResponse, Util } from '../commom/util';

@Injectable()
export class UserService {

    constructor(private http:HttpClient) {}

    public getApiUrl(str:string): string {
        return Config.currentBase.baseUrl + str;
    }

    public login(parameters: {login:String, password: String}): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.getApiUrl('/login'), parameters);
    }
    
    public findByFilter(request: FindByFilterRequest): Observable<FindByFilterResponse> {
        const options = { params: request as {}, headers: Util.makeLoggedHeaders() };

        return this.http.get<FindByFilterResponse>(this.getApiUrl('/user'), options);
    }

    public findById(request: GenericFindByIdRequest): Observable<GenericFindByIdResponse<User>> {
        const options = { headers: Util.makeLoggedHeaders() };

        return this.http.get<GenericFindByIdResponse<User>>(this.getApiUrl('/user'), options);
    }
    
    public save(request: GenericSaveRequest<User>): Observable<GenericSaveResponse> {
        const options = { headers: Util.makeLoggedHeaders() };

        return this.http.put<GenericSaveResponse>(this.getApiUrl('/user'), request, options);
    }

    public remove(request: GenericRemoveRequest): Observable<GenericRemoveResponse> {
        let options = {
            body: request,
            headers: Util.makeLoggedHeaders()
        };

        return this.http.request<GenericRemoveResponse>("DELETE", this.getApiUrl('/user'), options);
    }
    

}

export class FindByFilterRequest extends GenericDatagridRequest {
    nome: string
    //empresa: number
    sortBy: string
    sortType: string
}

export class FindByFilterResponse extends GenericDatagridResponse<User> {

}


export class LoginResponse {
	status: string;
	cause: string;
	result: {hash: string, user: User};
}