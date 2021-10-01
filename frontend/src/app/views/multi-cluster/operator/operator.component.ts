import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Deployments, Pods, ResourcesUtils, ResourceTypes } from 'src/app/core/models/resources.result';
import { AuthService } from 'src/app/core/services/auth.service';
import { ClustersService } from 'src/app/core/services/clusters.service';
import { DeploymentsService } from 'src/app/core/services/deployments.service';
import { RealTimeEventsService } from 'src/app/core/services/events.realtime.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PodsService } from 'src/app/core/services/pods.service';
export interface multiClusterOperation {
  clusters?: string[],
  kinds?: string,
  actions?: string,
  subscribeToResult?: boolean,
  scaleCount?: number,
  matchSelectorKey?: string,
  matchSelectorValue?: string,
  nameSpace?: string,
  searchOption?: string,
  replicaCount?: number,
  showMatched?: boolean
}
@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {
  private destory$: Subject<boolean> = new Subject()
  public loading$: Subject<boolean> = new Subject()
  public results: Map<string, Deployments[] | Pods[] | any[]>
  public model: multiClusterOperation = { showMatched: true,scaleCount:0,subscribeToResult: true }
  public clusters: SelectItem[] = []
  public kinds: SelectItem[] = [{
    label: "Deployments",
    value: "Deployments"
  },
  {
    label: "Pods",
    value: "Pods"
  }
  ]

  public searchOptions: SelectItem[] = [{
    label: "All under name Space",
    value: "NameSpace"
  },
  {
    label: "All match selector",
    value: "selector"
  }
  ]
  public actions: SelectItem[] = [];
  constructor(private clusterService: ClustersService,
    private deploymentService: DeploymentsService,
    private resourcesUtils: ResourcesUtils,
    private notification: NotificationService,
    private eventService: RealTimeEventsService<Deployments | Pods>,
    private podsService: PodsService,
    private auth: AuthService
  ) { }
  ngOnInit(): void {
    const currentUser = this.auth.currentUser()
    this.clusterService.get()
      .then(res => {
        res.data
        .filter(c=> c.users.findIndex(u=> u.userId == currentUser.userId && 
           (u.permissons.includes('ClusterManager')) || u.permissons.includes('ReadWrite')) > -1 || currentUser.isAdmin
          )
        .forEach(c => {
          this.clusters.push({
            label: c.name,
            value: c.name
          })
        })
      })
  }

  public onKindChange() {
    this.actions = []
    this.actions.push(
      {
        label: "Delete",
        value: "Delete"
      }
    )
    switch (this.model.kinds) {
      case "Deployments": {
        this.actions.push(
          {
            label: "Restart",
            value: "Restart"
          },
          {
            label: "Change Scale",
            value: "ChangeScale"
          }
        )
      }
    }
  }


  public reset(){
    this.model = { showMatched: true,scaleCount:0 ,subscribeToResult: true }
    this.results = null
    this.destory$.next(true)
    this.destory$.complete()
  }
  public runDeployments() {
    if (this.model.subscribeToResult) {
      this.eventService.subscribe()
      this.eventService.messages
        .pipe(
          filter(e => !!e && e.Resource == ResourceTypes.RESOUCETYPE_DEPLOYMENTS
            && Array.from(this.results.keys()).includes(e.ClusterId)
          ),
          takeUntil(this.destory$)
        ).subscribe(e => {
          this.getDeployments(e.ClusterId)
        })
    }
    this.model.clusters.forEach(cl => {
      this.results.get(cl)
        .forEach((d: Deployments) => {
          switch (this.model.actions) {
            case 'Delete': {
              this.deploymentService.delete(d.metadata.namespace, d.metadata.name, cl)
              break
            }

            case 'Restart': {
              this.deploymentService.update(d, d.metadata.namespace,"restart=1", cl)
              break
            }

            case 'ChangeScale': {
              this.deploymentService.update(d, d.metadata.namespace,`scale=${this.model.scaleCount}`, cl)
              break
            }
          }

        })
    })

  }

  public runPods() {
    if (this.model.subscribeToResult) {
      this.eventService.subscribe()
      this.eventService.messages
        .pipe(
          filter(e => !!e && e.Resource == ResourceTypes.RESOUCETYPE_PODS
            && Array.from(this.results.keys()).includes(e.ClusterId)
          ),
          takeUntil(this.destory$)
        ).subscribe(e => {
          this.getPods(e.ClusterId)
        })
    }
    this.model.clusters.forEach(cl => {
      this.results.get(cl)
        .forEach((d: Pods) => {
          switch (this.model.actions) {
          
            case 'Delete': {
              this.podsService.delete(d.metadata.namespace, d.metadata.name, cl)
              break
            }
          }

        })
    })

  }

  public run(){
    if(this.model.kinds == 'Deployments'){
      this.runDeployments()
    }else{
      this.runPods()
    }
  }

  private getDeployments(cluster: string) {
    this.deploymentService.getByClusterAndNameSpace(
      cluster, this.model.nameSpace, (this.model.matchSelectorKey && this.model.matchSelectorValue) ?
      `selector=${this.model.matchSelectorKey}=${this.model.matchSelectorValue}` : ''
    ).then(res => {
      res.data.items.forEach(d => {
        this.resourcesUtils.addDeploymentLastState(d)
      })
      this.results.set(cluster, res.data.items)

    }).catch(err => {
      this.results.set(cluster, [])
      this.notification.error(err)

    }).finally(() => {
      if (this.results.size == this.clusters.length) {
        this.loading$.next(false)
      }
    })
  }

  
  private getPods(cluster: string) {
    this.podsService.getByClusterAndNameSpace(
      cluster, this.model.nameSpace, (this.model.matchSelectorKey && this.model.matchSelectorValue) ?
      `selector=${this.model.matchSelectorKey}=${this.model.matchSelectorValue}` : ''
    ).then(res => {
      this.results.set(cluster, res.data.items)

    }).catch(err => {
      this.results.set(cluster, [])
      this.notification.error(err)

    }).finally(() => {
      if (this.results.size == this.clusters.length) {
        this.loading$.next(false)
      }
    })
  }

  public find() {
    this.loading$.next(true)
    this.results = new Map()
    this.model.clusters
      .forEach(cl => {
        if(this.model.kinds == 'Deployments'){
          this.getDeployments(cl)
        }else{
          this.getPods(cl)
        }
       
      })
  }
}
