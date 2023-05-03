import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginUser } from '../model/loginModel';
import { StorageService } from '../services/storage.service';

@Injectable({
    providedIn: 'root',
})
export class RouterGuard implements CanActivate {
    constructor(private session: StorageService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const user: LoginUser = this.session.getStorage('user');

        if (!user.isAdmin) {
            return this.router.navigateByUrl('home/medicines');
        }
        return true;
    }
}
