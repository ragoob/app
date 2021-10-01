import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Clusters } from 'src/app/core/models/clusters';
import { AuthService } from 'src/app/core/services/auth.service';
import { HealthCheckService } from 'src/app/core/services/health-check.service';
import { ClustersService } from '../../../../core/services/clusters.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1)
  dataSource: Clusters[] = [];

  constructor(private clusterService: ClustersService, private healthCheckService: HealthCheckService, private router: Router,public auth: AuthService) { }


  ngOnInit(): void {
    this.healthCheckService.subscribe()
    this.healthCheckService.messages
      .pipe(takeUntil(this.destroyed$))
      .subscribe(msg => {
        if (msg && msg.data) {
          msg.data.forEach(m=> {
            const index = this.dataSource.findIndex(c=> c.id == m.id)
            if(index > -1){
              this.dataSource[index] = m
            }
          })
         
        }
      })
    this.clusterService.clusterResult$
      .pipe(filter(res => res != null),
        takeUntil(this.destroyed$)
      )
      .subscribe(res => {
        this.dataSource = res.data
      })

  }

  public addNew() {
   this.router.navigate(['/managment/clusters/register'])
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }

  ngAfterViewInit() {

  }

}
