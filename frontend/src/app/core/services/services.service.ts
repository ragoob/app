import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { BASE_URL_TOKEN } from "src/app/consts/config";
import { environment } from "src/environments/environment";
import {   ResourceResult, ResourceResultOne, Services } from "../models/resources.result";
import { BaseService } from "./base.service";

@Injectable({providedIn:'root'})
export class ServicesService extends BaseService{
    public result$: BehaviorSubject<ResourceResult<Services>> = new BehaviorSubject(null)

 constructor(private http: HttpClient, protected router: Router, @Inject(BASE_URL_TOKEN) private baseUrl: string){
     super(router)
 }

 async get(): Promise<ResourceResult<Services>> {
    return this.http.get<ResourceResult<Services>>(`${this.baseUrl}${environment.api.k8s}/${this.clusterId()}/${this.NameSpacesId()}${environment.api.services}`)
    .pipe(map(res=> {
        this.result$.next(res)
      return res
    }))
      .toPromise()

  }

  create(model: Services, nameSpace: string): Promise<Services> {
    return this.http.post<Services>(`${this.baseUrl}${environment.api.k8s}/${this.clusterId()}/${nameSpace}${environment.api.services}`, model)
      .pipe(map(res => {
        return res
      }))
      .toPromise()
  }

  getOne(nameSpace: string, name: string): Promise<ResourceResultOne<Services>> {
    
    return this.http.get<ResourceResultOne<Services>>(`${this.baseUrl}${environment.api.k8s}/${this.clusterId()}/${nameSpace}/${environment.api.services}/${name}`)
    .pipe(map(res=> {
      return res
    }))
      .toPromise()

  }

  delete(nameSpace: string, name: string,cluster?: string): Promise<ResourceResult<Services>> {
    if(!cluster){
      cluster = this.clusterId()
    }
    return this.http.delete<ResourceResult<Services>>(`${this.baseUrl}${environment.api.k8s}/${cluster}/${nameSpace}${environment.api.services}/${name}`)
    .pipe(map(res=> {
        this.result$.next(res)
      return res
    }))
      .toPromise()
  }
}