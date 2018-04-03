import { Category } from './../commom/models';
import { GenericRemoveRequest, GenericRemoveResponse, GenericFindByIdRequest, GenericFindByIdResponse } from './../commom/util';
import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient } from '@angular/common/http';
import { Observable }    from 'rxjs/Observable';
import { User }    from '../commom/models';
import { Config }    from '../commom/config';
import { GenericDatagridResponse, GenericDatagridRequest } from '../commom/datagrid/datagrid.component';
import { GenericSaveRequest, GenericSaveResponse } from '../commom/util';
import { RequestOptions } from '@angular/http';
import { RequestMethod } from '@angular/http';
import { HttpParams } from '@angular/common/http/src/params';

@Injectable()
export class CategoryService {

    constructor(private http: HttpClient) {}

    private getApiUrl(str:string): string {
        return Config.currentBase.baseUrl + str;
    }
    
    public findByFilter(request: FindByFilterRequest): Observable<FindByFilterResponse> {
        const options = { params: request as {} };

        return this.http.get<FindByFilterResponse>(this.getApiUrl('/category'), options);
    }

    public findById(request: GenericFindByIdRequest): Observable<GenericFindByIdResponse<Category>> {
        return this.http.get<GenericFindByIdResponse<Category>>(this.getApiUrl('/category'));
    }
    
    public save(request: GenericSaveRequest<Category>): Observable<GenericSaveResponse> {
        return this.http.put<GenericSaveResponse>(this.getApiUrl('/category'), request);
    }

    public remove(request: GenericRemoveRequest): Observable<GenericRemoveResponse> {
        let options = {
            body: request
        };

        return this.http.request<GenericRemoveResponse>("DELETE", this.getApiUrl('/category'), options);
    }

}

export class FindByFilterRequest extends GenericDatagridRequest {
    name: string
    empresa?: number
}

export class FindByFilterResponse extends GenericDatagridResponse<Category> {

}