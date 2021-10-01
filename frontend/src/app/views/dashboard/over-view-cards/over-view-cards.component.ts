import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClusterResult } from 'src/app/core/models/clusters';
import { ClustersService } from 'src/app/core/services/clusters.service';
import { HealthCheckService } from 'src/app/core/services/health-check.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-over-view-cards',
  templateUrl: './over-view-cards.component.html',
  styleUrls: ['./over-view-cards.component.scss']
})
export class OverViewCardsComponent implements OnInit,OnDestroy{
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1)
  constructor(private healthCheckService: HealthCheckService,private clusterService: ClustersService){

  }
  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
  ngOnInit(): void {
    this.healthCheckService.subscribe()
    this.healthCheckService.messages
    .pipe(takeUntil(this.destroyed$))
    .subscribe(msg=>{
      if(msg && msg.data)
       {
         if(this.clusterService.clusterId()){
           this.result = this.getClusterMetrics(msg)
         }else{
          this.result =msg
         }
       
       }
    })
  }
  @Input('data') result: ClusterResult
  @Input('all') all?: boolean

  getClusterMetrics(msg: ClusterResult){
    const metrics = msg.data.find(c=> c.name == this.clusterService.clusterId())
    msg.data = msg.data.filter(c=> c.name == this.clusterService.clusterId())
    if(metrics && metrics.metrics){
      msg.aggregation.totalCount = 1;
      msg.aggregation.totalCpu = metrics.metrics.totalCpuCores;
      msg.aggregation.cpuPercentage = metrics.metrics.cpuPercentage;
      msg.aggregation.totalMemory = metrics.metrics.totalMemory;
      msg.aggregation.totalCpuUsage  = metrics.metrics.totalCpuUsage;
      msg.aggregation.totalMemoryUsage = metrics.metrics.totalMemoryUsage;
      msg.aggregation.memoryPercentage = metrics.metrics.memoryPercentage;
      msg.aggregation.totalNodes = metrics.metrics.nodesCount;
    }

    return msg;
  }
}
