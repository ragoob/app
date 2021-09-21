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
  displayedColumns: string[] = ["isConnected","name","nodesCount","provider","totalCpuCores","totalMemory"];
  dataSource = new MatTableDataSource<Clusters>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private changeDetectorRefs: ChangeDetectorRef,private clusterService: ClustersService,private healthCheckService: HealthCheckService<Clusters[]>) { }


  ngOnInit(): void {
    this.healthCheckService.messages
    .pipe(takeUntil(this.destroyed$))
    .subscribe(msg=>{
      this.dataSource = new MatTableDataSource<Clusters>(msg)
      this.changeDetectorRefs.detectChanges();
    })
    this.clusterService.result$
    .pipe(filter(res=> res != null),
     takeUntil(this.destroyed$)
    )
    .subscribe(res=> {
      this.dataSource = new MatTableDataSource<Clusters>(res.data)
      this.dataSource.paginator = this.paginator;
      this.changeDetectorRefs.detectChanges();
    })
   
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
