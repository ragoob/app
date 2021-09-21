import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { BASE_URL_TOKEN } from "src/app/consts/config";
import { environment } from "src/environments/environment";
import {  Deployments, Nodes, Pods, ResourceResult } from "../models/resources.result";
import { BaseService } from "./base.service";

@Injectable({providedIn:'root'})
export class DeploymentsService extends  BaseService{
    public result$: BehaviorSubject<ResourceResult<Deployments>> = new BehaviorSubject(null)

 constructor(private http: HttpClient, protected router: Router, @Inject(BASE_URL_TOKEN) private baseUrl: string){
     super(router)
 }

 async get(): Promise<ResourceResult<Deployments>> {
    
    return this.http.get<ResourceResult<Deployments>>(`${this.baseUrl}${environment.api.k8s}/${this.clusterId()}/${this.NameSpacesId()}${environment.api.deployments}`)
    .pipe(map(res=> {
        this.result$.next(res)
      return res
    }))
      .toPromise()

  }
}