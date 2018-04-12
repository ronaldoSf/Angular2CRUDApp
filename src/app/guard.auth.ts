import {Injectable} from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { User, UserRoles } from './commom/models';
import "rxjs/add/observable/of";
import { MAT_TOOLTIP_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/material/tooltip';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private _router: Router
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean>{
        var path = route.url.map(item => item.path).join()
        console.log(path)
        return Observable.of(path.indexOf("usuario") >= 0 ? AuthGuard.isAdmin() : AuthGuard.isLogged())
    }

    static isAdmin(): boolean {
        var loginDataStr = localStorage.getItem("loginData")

        if (!loginDataStr) {
            return false
        }

        var loginData: {hash: string, user: User} = JSON.parse(loginDataStr)

        
        if (!loginData) {
            return false
        }
        
        if (loginData.user.role != UserRoles.ADMIN.value) {
            return false
        }

        return true
    }

    static isLogged(): boolean {
        var loginDataStr = localStorage.getItem("loginData")

        if (!loginDataStr) {
            return false
        }

        return true;
    }
}