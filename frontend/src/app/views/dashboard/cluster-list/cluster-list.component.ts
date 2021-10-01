import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import {  ClusterResult, Clusters } from 'src/app/core/models/clusters';
import { ClustersService } from 'src/app/core/services/clusters.service';
import { HealthCheckService } from 'src/app/core/services/health-check.service';
import { WebSocketService } from 'src/app/core/services/ws.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cluster-list',
  templateUrl: './cluster-list.component.html',
  styleUrls: ['./cluster-list.component.scss']
})
export class ClusterListComponent implements OnInit , AfterViewInit ,OnDestroy{
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1)
  dataSource: Clusters[] = [];

  constructor(private clusterService: ClustersService,private healthCheckService: HealthCheckService) { }


  ngOnInit(): void {
    this.healthCheckService.subscribe()
    this.healthCheckService.messages
    .pipe(takeUntil(this.destroyed$))
    .subscribe(msg=>{
      if(msg && msg.data)
       {
         
        this.dataSource =msg.data
       }
    })
    this.clusterService.clusterResult$
    .pipe(filter(res=> res != null),
     takeUntil(this.destroyed$)
    )
    .subscribe(res=> {
      this.dataSource =res.data
    })
   
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
  
  ngAfterViewInit() {
    
  }

}
