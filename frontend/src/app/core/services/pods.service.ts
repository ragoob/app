import { HttpClient } from "@angular/common/http";
import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { BASE_URL_TOKEN } from "src/app/consts/config";
import { environment } from "src/environments/environment";
import {   Pods, ResourceResult } from "../models/resources.result";
import { BaseService } from "./base.service";

@Injectable({providedIn:'root'})
export class PodsService extends BaseService{
    public result$: BehaviorSubject<ResourceResult<Pods>> = new BehaviorSubject(null)

 constructor(private http: HttpClient, protected router: Router, @Inject(BASE_URL_TOKEN) private baseUrl: string){
     super(router)
 }

 create(model: Pods,nameSpace: string): Promise<Pods> {
  return this.http.post<Pods>(`${this.baseUrl}${environment.api.k8s}/${this.clusterId()}/${nameSpace}${environment.api.pods}`,model)
  .pipe(map(res=> {
    return res
  }))
    .toPromise()
}

  get(selector?: string): Promise<ResourceResult<Pods>> {
    let url: string = `${this.baseUrl}${environment.api.k8s}/${this.clusterId()}/${this.NameSpacesId()}${environment.api.pods}`
    if(selector){
      url = url + `?selector=${selector}`
    }
    return this.http.get<ResourceResult<Pods>>(url)
    .pipe(map(res=> {
        this.result$.next(res)
      return res
    }))
      .toPromise()
  }

  delete(nameSpace: string, name: string): Promise<ResourceResult<Pods>> {
    return this.http.delete<ResourceResult<Pods>>(`${this.baseUrl}${environment.api.k8s}/${this.clusterId()}/${nameSpace}${environment.api.pods}/${name}`)
    .pipe(map(res=> {
        this.result$.next(res)
      return res
    }))
      .toPromise()
  }
}