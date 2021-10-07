import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL_TOKEN } from 'src/app/consts/config';
import { environment } from 'src/environments/environment';
import { ClusterResult, Clusters } from '../models/clusters';
import {filter, map} from 'rxjs/operators'
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class ClustersService extends BaseService {
  public akaMenu$: BehaviorSubject<ClusterResult> = new BehaviorSubject(null)
  public clusterResult$: BehaviorSubject<ClusterResult> = new BehaviorSubject(null)
  public selectedCluster$:  BehaviorSubject<ClusterResult> = new BehaviorSubject(null)

  constructor(protected router: Router, private http: HttpClient, @Inject(BASE_URL_TOKEN) private baseUrl: string) {
    super(router)
  }

  getSelectedCluster(name?: string) : Observable<Clusters>{
    return this.clusterResult$
    .pipe(filter(res=> res != null && res.data.findIndex(c=> c.name == (name ? name :this.clusterId())) > -1),
     map(res=> res.data[0])
    )
    
  }

  getById(id: string): Promise<ClusterResult> {
    let url = `${this.baseUrl}${environment.api.clusters}/${id}`
    return this.http.get<ClusterResult>(url)
    .pipe(map(res=> {
      return res
    }))
      .toPromise()
  }

   get(): Promise<ClusterResult> {
    let url = `${this.baseUrl}${environment.api.clusters}`
    if(this.clusterId()){
      url = `${url}/${this.clusterId()}`
    }
    return this.http.get<ClusterResult>(url)
    .pipe(map(res=> {
      this.clusterResult$.next(res)
      return res
    }))
      .toPromise()
  }

  Create(model: Clusters): Promise<ClusterResult> {
    let url = `${this.baseUrl}${environment.api.clusters}`
    return this.http.post<ClusterResult>(url,model)
    .pipe(map(res=> {
      return res
    }))
      .toPromise()
  }
  
  Update(model: Clusters): Promise<ClusterResult> {
    let url = `${this.baseUrl}${environment.api.clusters}/${model.name}`
    return this.http.put<ClusterResult>(url,model)
    .pipe(map(res=> {
      return res
    }))
      .toPromise()
  }

  Delete(id: string): Promise<ClusterResult> {
    let url = `${this.baseUrl}${environment.api.clusters}/${id}`
    return this.http.delete<ClusterResult>(url)
    .pipe(map(res=> {
      return res
    }))
      .toPromise()
  }
}
