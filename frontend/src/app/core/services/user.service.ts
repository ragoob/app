import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { BASE_URL_TOKEN } from "src/app/consts/config";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
  })
export class UserService{
    constructor(protected router: Router, private http: HttpClient, @Inject(BASE_URL_TOKEN) private baseUrl: string) {
    }
  
    getById(id: string): Promise<User> {
      let url = `${this.baseUrl}${environment.api.users}/${id}`
      return this.http.get<User>(url)
        .toPromise()
    }
  
     get(): Promise<User[]> {
      let url = `${this.baseUrl}${environment.api.users}`
      return this.http.get<User[]>(url)
        .toPromise()
    }

    create(model: User): Promise<any> {
      let url = `${this.baseUrl}${environment.api.users}`
      return this.http.post<any>(url,model)
        .toPromise()
    }

    delete(userName: string): Promise<any> {
      let url = `${this.baseUrl}${environment.api.users}/${userName}`
      return this.http.delete<any>(url)
        .toPromise()
    }

    changePassword(model: User): Promise<any> {
      let url = `${this.baseUrl}${environment.api.users}/changePassword`
      return this.http.put<any>(url,model)
        .toPromise()
    }

    update(model: User): Promise<any> {
      let url = `${this.baseUrl}${environment.api.users}/`
      return this.http.put<any>(url,model)
        .toPromise()
    }
}