import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { BASE_URL_TOKEN } from "src/app/consts/config";
import { environment } from "src/environments/environment";
import { Auth } from "../models/auth.model";
import { TokenResponse } from "../models/token-response.model";
import { User } from "../models/user.model";
import jwt_decode from 'jwt-decode';
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly http: HttpClient,
     @Inject(BASE_URL_TOKEN) private baseUrl: string, 
     private router: Router,private jwtHelper: JwtHelperService) { }

  public login(model: Auth): Promise<void> {
    return this.http.post<TokenResponse>(`${this.baseUrl}${environment.api.auth}`, model)
      .pipe(map((res: TokenResponse) => {
        return this.cacheToken(res.jwtToken)
      })).toPromise()
  }

  public logOut(): void {
    localStorage.removeItem('token')
    this.router.navigate(["login"])
    
  }
  private cacheToken(token: string): void {
    localStorage.setItem('token', token)
    this.router.navigate([""])
    
  }

  public getUser(): Observable<User> {
    return new Observable((observer) => {
      try {
        const token: string = localStorage.getItem('token');
        const user: User = jwt_decode<User>(token)
        if(user && !this.jwtHelper.isTokenExpired(token))
        observer.next(user)
        else
        observer.error(`Session expired`)
      }
      catch (error) {
        observer.error(error)
      }
    });
  }

  
}