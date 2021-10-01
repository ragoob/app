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
}