import { Component, OnInit } from '@angular/core';
import { ClusterResult } from 'src/app/core/models/clusters';
import { ClustersService } from 'src/app/core/services/clusters.service';


@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public result: ClusterResult = new ClusterResult()
  constructor(private clusterService: ClustersService){
   
  }

  ngOnInit(): void {
    this.clusterService.get()
    .then(res=> this.result = res)
  }
}
