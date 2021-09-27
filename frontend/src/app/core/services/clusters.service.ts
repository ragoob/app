import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BASE_URL_TOKEN } from 'src/app/consts/config';
import { environment } from 'src/environments/environment';
import { ClusterResult } from '../models/clusters';
import { AuthService } from './auth.service';
import {map} from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ClustersService {
  public result$: BehaviorSubject<ClusterResult> = new BehaviorSubject(null)
  constructor(private http: HttpClient, @Inject(BASE_URL_TOKEN) private baseUrl: string) {

  }

  async get(): Promise<ClusterResult> {
    return this.http.get<ClusterResult>(`${this.baseUrl}${environment.api.clusters}`)
    .pipe(map(res=> {
      this.result$.next(res)
      return res
    }))
      .toPromise()
  }


}
