import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService} from './local-storage.service'
import {map} from 'rxjs/operators'
import { environment } from './../../../environments/environment';
const SERVER_URL = environment.api_url;

export interface IApiParams {
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    query?: any;
    body?: any;
    noAuth?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        public http: HttpClient,
        public storageBrowser: LocalStorageService
        ) {
    }

    public request(params: IApiParams): Observable<any> {
        const {path, method, body, query} = params;
        const token = this.storageBrowser.get('token');
        this.storageBrowser.get('user')
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        });

        return this.http.request(method, `${SERVER_URL}${path}`, {body, params: query, headers});
    }


    public requestPDFFile(path:any){
        window.open(`${path}`, '_blank');
    }

   public getFileById(id: any): Observable<any> {
        return this.request({
            path: `uploads/getById/${id}`,
            method: 'GET',
        }).pipe(map((res) => {
            return res.file;
        }));
    }

    public requestFormData(params: IApiParams): Observable<any> {
        const {path, method, body, query} = params;

        return this.http.request(method, `${SERVER_URL}${path}`, {body, params: query});
    }
}
