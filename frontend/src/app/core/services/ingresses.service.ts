import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { BASE_URL_TOKEN } from "src/app/consts/config";
import { environment } from "src/environments/environment";
import {  Ingresses, ResourceResult, ResourceResultOne } from "../models/resources.result";
import { BaseService } from "./base.service";

@Injectable({providedIn:'root'})
export class IngressesService extends BaseService{
    public result$: BehaviorSubject<ResourceResult<Ingresses>> = new BehaviorSubject(null)

 constructor(private http: HttpClient, protected router: Router, @Inject(BASE_URL_TOKEN) private baseUrl: string){
     super(router)
 }

 async get(): Promise<ResourceResult<Ingresses>> {
    return this.http.get<ResourceResult<Ingresses>>(`${this.baseUrl}${environment.api.k8s}/${this.clusterId()}/${this.NameSpacesId()}${environment.api.ingresses}`)
    .pipe(map(res=> {
        this.result$.next(res)
      return res
    }))
      .toPromise()

  }

  create(model: Ingresses, nameSpace: string): Promise<Ingresses> {
    return this.http.post<Ingresses>(`${this.baseUrl}${environment.api.k8s}/${this.clusterId()}/${nameSpace}${environment.api.ingresses}`, model)
      .pipe(map(res => {
        return res
      }))
      .toPromise()
  }

  getOne(nameSpace: string, name: string): Promise<ResourceResultOne<Ingresses>> {
    
    return this.http.get<ResourceResultOne<Ingresses>>(`${this.baseUrl}${environment.api.k8s}/${this.clusterId()}/${nameSpace}/${environment.api.ingresses}/${name}`)
    .pipe(map(res=> {
      return res
    }))
      .toPromise()

  }

  delete(nameSpace: string, name: string,cluster?: string): Promise<ResourceResult<Ingresses>> {
    if(!cluster){
      cluster = this.clusterId()
    }
    return this.http.delete<ResourceResult<Ingresses>>(`${this.baseUrl}${environment.api.k8s}/${cluster}/${nameSpace}${environment.api.ingresses}/${name}`)
    .pipe(map(res=> {
        this.result$.next(res)
      return res
    }))
      .toPromise()
  }
}