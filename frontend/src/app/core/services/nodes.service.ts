import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { BASE_URL_TOKEN } from "src/app/consts/config";
import { environment } from "src/environments/environment";
import {  Nodes, ResourceResult } from "../models/resources.result";
import { BaseService } from "./base.service";

@Injectable({providedIn:'root'})
export class NodesService  extends BaseService{
    public result$: BehaviorSubject<Nodes[]> = new BehaviorSubject(null)

 constructor(private http: HttpClient, protected router: Router, @Inject(BASE_URL_TOKEN) private baseUrl: string){
     super(router)
 }

 async get(): Promise<Nodes[]> {
    return this.http.get<Nodes[]>(`${this.baseUrl}${environment.api.k8s}/${this.clusterId()}//metrics/Nodes`)
    .pipe(map(res=> {
      res  = res.sort((a,b)=> {
        return a.metadata.name.localeCompare(b.metadata.name)
      })
        this.result$.next(res)
      return res
    }))
      .toPromise()

  }
}