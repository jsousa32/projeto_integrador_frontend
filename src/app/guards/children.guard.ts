import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateChild,
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
export class ChildrenGuard implements CanActivateChild {
    constructor(private session: StorageService, private router: Router) {}

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const user: LoginUser = this.session.getStorage('user');

        if (user === null) {
            return this.router.navigateByUrl('login');
        }
        return true;
    }
}
