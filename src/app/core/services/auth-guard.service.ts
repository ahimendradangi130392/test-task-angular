import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        public userService: UserService
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.userService.user) {
            return true;
        } else {
			this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot): Promise<boolean> | boolean {
        let myRole = this.userService.user.role;

        let roles = route.data['roles'] as Array<string>;
        if (!roles || roles.indexOf(myRole) != -1) return true;
        else {
            this.router.navigate(['/customers-order']); //или на страницу авторизации
            return false;
        }
    }
}
