import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {catchError, map} from 'rxjs/operators'
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.getUser()
    .pipe(map((res: User) => {
      if(!res){
        this.router.navigate(['/login']);
        return false
      }
      return true
    }), catchError(() => {
      this.router.navigate(['/login']);
      return of(false)
  }))
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       return this.auth.getUser()
    .pipe(map((res: User) => {
      if(!res){
        this.router.navigate(['/login']);
        return false
      }

      return true
    }),
    catchError(() => {
      this.router.navigate(['/login']);
      return of(false)
  }))
  }
  
}
