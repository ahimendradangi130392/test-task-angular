import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../../core/services/api.service';

@Injectable()
export class AuthService extends ApiService {
    public login(loginData:any): Observable<any> {
        return this.request({
            path: 'auth/login',
            method: 'POST',
            body: loginData
        });
    }
    public forgotPassword(passwordData:any): Observable<any> {
        return this.request({
            path: `users/password?email=${passwordData.username}&code=${passwordData.code}&password=${passwordData.password}`,
            method: 'POST',
            body: passwordData
        });
    }
}
