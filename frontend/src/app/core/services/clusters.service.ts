import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BASE_URL_TOKEN } from 'src/app/consts/config';
import { environment } from 'src/environments/environment';
import { ClusterResult } from '../models/clusters';
import {map} from 'rxjs/operators'
import { Router } from '@angular/router';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class ClustersService extends BaseService {
  public result$: BehaviorSubject<ClusterResult> = new BehaviorSubject(null)
  public akaMenu$: BehaviorSubject<ClusterResult> = new BehaviorSubject(null)
  constructor(protected router: Router, private http: HttpClient, @Inject(BASE_URL_TOKEN) private baseUrl: string) {
    super(router)
  }

   get(): Promise<ClusterResult> {
    let url = `${this.baseUrl}${environment.api.clusters}`
    if(this.clusterId()){
      url = `${url}/${this.clusterId()}`
    }
    return this.http.get<ClusterResult>(url)
    .pipe(map(res=> {
      this.result$.next(res)
      return res
    }))
      .toPromise()
  }

  
}
