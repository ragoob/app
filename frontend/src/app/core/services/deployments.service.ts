import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { BASE_URL_TOKEN } from "src/app/consts/config";
import { environment } from "src/environments/environment";
import {  Deployments, Nodes, Pods, ResourceResult, ResourceResultOne } from "../models/resources.result";
import { BaseService } from "./base.service";

@Injectable({providedIn:'root'})
export class DeploymentsService extends  BaseService{
    public result$: BehaviorSubject<ResourceResult<Deployments>> = new BehaviorSubject(null)

 constructor(private http: HttpClient, protected router: Router, @Inject(BASE_URL_TOKEN) private baseUrl: string){
     super(router)
 }

 getByClusterAndNameSpace(clusterId?: string,nameSpace?: string,query?: string): Promise<ResourceResult<Deployments>> {
  const givenCluster = clusterId ? clusterId: this.clusterId();
  const givenNameSpace = nameSpace? nameSpace: this.NameSpacesId()
 return this.http.get<ResourceResult<Deployments>>(`${this.baseUrl}${environment.api.k8s}/${givenCluster}/${givenNameSpace}${environment.api.deployments}?${query}`)
 .pipe(map(res=> {
     this.result$.next(res)
   return res
 }))
   .toPromise()

}

  get(query?: string): Promise<ResourceResult<Deployments>> {
    let url = `${this.baseUrl}${environment.api.k8s}/${this.clusterId()}/${this.NameSpacesId()}${environment.api.deployments}`
    if(query){
      url = `${url}?${query}`
    }
    return this.http.get<ResourceResult<Deployments>>(url)
    .pipe(map(res=> {
        this.result$.next(res)
      return res
    }))
      .toPromise()

  }

  getOne(nameSpace: string, name: string): Promise<ResourceResultOne<Deployments>> {
    
    return this.http.get<ResourceResultOne<Deployments>>(`${this.baseUrl}${environment.api.k8s}/${this.clusterId()}/${nameSpace}/${environment.api.deployments}/${name}`)
    .pipe(map(res=> {
      return res
    }))
      .toPromise()

  }

  create(model: Deployments,nameSpace: string): Promise<Deployments> {

    return this.http.post<Deployments>(`${this.baseUrl}${environment.api.k8s}/${this.clusterId()}/${nameSpace}${environment.api.deployments}`,model)
    .pipe(map(res=> {
      return res
    }))
      .toPromise()
  }

  update(model: Deployments,nameSpace: string, query?: string,clusterId?: string): Promise<Deployments> {
    if(!clusterId){
      clusterId = this.clusterId();
    }
    return this.http.put<Deployments>(`${this.baseUrl}${environment.api.k8s}/${clusterId}/${nameSpace}${environment.api.deployments}?${query}`,model)
    .pipe(map(res=> {
      return res
    }))
      .toPromise()
  }

  delete(nameSpace: string,name: string, clusterId?: string): Promise<Deployments> {
    if(!clusterId){
      clusterId = this.clusterId();
    }
    return this.http.delete<Deployments>(`${this.baseUrl}${environment.api.k8s}/${clusterId}/${nameSpace}${environment.api.deployments}/${name}`)
    .pipe(map(res=> {
      return res
    }))
      .toPromise()
  }
}