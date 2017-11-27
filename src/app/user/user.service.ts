import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient} from '@angular/common/http';
import { Observable }    from 'rxjs/Observable';
import { Usuario }    from '../commom/models';
import { Config }    from '../commom/config';

@Injectable()
export class UserService {

    constructor(private http:HttpClient) {}

    private getApiUrl(str:string): string {
        return Config.currentBase.baseUrl + str;
    }
    
    public login(parameters: {login:String, password: String}): Observable<Usuario> {
        return this.http.post<Usuario>(this.getApiUrl('usuario/login.json'), parameters);
    }

}