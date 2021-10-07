import { HttpClient } from "@angular/common/http";
import { Component, Inject, Injectable } from "@angular/core";
import { ActivatedRoute, ActivationEnd, NavigationEnd, Params, Router } from "@angular/router";
import { BehaviorSubject, pipe } from "rxjs";
import { filter, flatMap, map, mergeMap } from "rxjs/operators";
import { BASE_URL_TOKEN } from "src/app/consts/config";
import { environment } from "src/environments/environment";
import { NameSpace, ResourceResult } from "../models/resources.result";
import { BaseService } from "./base.service";

@Injectable({ providedIn: 'root' })
export class NameSpaceService  extends BaseService{
  public result$: BehaviorSubject<ResourceResult<NameSpace>> = new BehaviorSubject(null)

  constructor(private http: HttpClient, protected router: Router, @Inject(BASE_URL_TOKEN) private baseUrl: string) {
    
    super(router)
  }
  get(): Promise<ResourceResult<NameSpace>> {
    return  this.http.get<ResourceResult<NameSpace>>(`${this.baseUrl}${environment.api.k8s}/${this.clusterId()}${environment.api.nameSpaces}`)
    .pipe(map(res => {
      res.data.items  = res.data.items.sort((a,b)=> {
        return a.metadata.name.localeCompare(b.metadata.name)
      })
      this.result$.next(res)
      return res
    })).toPromise()
  }

  create(name: string): Promise<any> {
    return  this.http.post(`${this.baseUrl}${environment.api.k8s}/${this.clusterId()}${environment.api.nameSpaces}/${name}`,{})
    .pipe(map(res => {
      return res
    })).toPromise()
  }

  delete(name: string): Promise<any> {
    return  this.http.delete(`${this.baseUrl}${environment.api.k8s}/${this.clusterId()}${environment.api.nameSpaces}/${name}`)
    .pipe(map(res => {
      return res
    })).toPromise()
  }
}