import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { IUserInfo } from './../models/user-info.model';
import { LocalStorageService } from './local-storage.service';
import { ApiService } from './api.service';
import { Roles } from '../../shared/enums/role-types.enum';

@Injectable({
    providedIn: 'root',
})
export class UserService extends ApiService {
    user$: BehaviorSubject<IUserInfo> = new BehaviorSubject<IUserInfo | any>(undefined);

    get userId(): any {
        const user = this.user$.getValue();
        return user && user.id;
    }

    constructor(
        public http: HttpClient,
        private router: Router,
        private storageService: LocalStorageService,
    ) {
        super(http, null);
    }


    get userStorage(): any {
        return this.storageService.get('user');
    }

    get user(): any {
        return this.user$.getValue();
    }


    logOut(): void {
        this.resetAfterLogout();
    }

    resetAfterLogout(): void {
        this.storageService.clear();
        sessionStorage.clear();
        this.user$.next(null);
        this.router.navigate(['/auth/login']);
    }
    updateUser(id: number, body: any): Observable<any> {
        return this.request({
            method: 'PUT',
            path: `users/${id}`,
            body: body
        });
    }

    getAll(page: number = 1, limit: number = 100, q: string = '', orderField: string = '', orderDirection: string = ''): Observable<any> {
        return this.request({
            method: 'GET',
            path: `users`,
            query: {
                q: q,
                limit: limit,
                page: page,
                orderField: orderField,
                orderDirection: orderDirection
            }
        });
    }

    register(body: any): Observable<any> {
        return this.requestFormData({
            method: 'POST',
            path: `auth/register`,
            body
        });
    }

    deleteUser(id: any): Observable<any> {
        return this.request({
            method: 'DELETE',
            path: `users/deleteInCompleteUser/${id}`,
        });
    }
}
