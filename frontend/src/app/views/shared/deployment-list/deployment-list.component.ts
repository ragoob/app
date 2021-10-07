import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { EventStream } from 'src/app/core/models/event-stream';
import { NotificationTypes } from 'src/app/core/models/notifications';
import { Deployments, EventsTypes, ResourcesUtils, ResourceTypes } from 'src/app/core/models/resources.result';
import { AuthService } from 'src/app/core/services/auth.service';
import { DeploymentsService } from 'src/app/core/services/deployments.service';
import { RealTimeEventsService } from 'src/app/core/services/events.realtime.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-deployment-list',
  templateUrl: './deployment-list.component.html',
  styleUrls: ['./deployment-list.component.scss']
})
export class DeploymentListComponent implements OnInit , AfterViewInit ,OnDestroy {
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1)
  dataSource: Deployments[] = []
  constructor(public service: DeploymentsService,
     private util: ResourcesUtils,
      private eventService: RealTimeEventsService<Deployments>,
      private confirmationService: ConfirmationService,
      private notificationService: NotificationService,
      private router: Router,
      public auth: AuthService

     ) { }
  ngOnDestroy(): void {
    this.destroyed$.next(true)
   this.destroyed$.complete()
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.eventService.subscribe()
    this.eventService.messages
    .pipe(
      filter(e=> !!e && (e.NameSpace == this.service.NameSpacesId() || this.service.NameSpacesId() == 'all') && e.Resource == ResourceTypes.RESOUCETYPE_DEPLOYMENTS),
      takeUntil(this.destroyed$)
      ).subscribe(e=> {
      this.load()
    })

    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        if(this.service.clusterId() && this.service.clusterId() != ""){
          this.load()
        }
      }
   });
   
    this.load()
  }

  private load(): void{
    this.service.get()
    .then(res=> {
      res.data.items.forEach(c=> this.util.addDeploymentLastState(c))
      this.dataSource = res.data.items
    })
  }


  public scale(model: Deployments){
    const scaleCount = model.status?.replicas  ? model.status?.replicas + 1 : 1
    this.service.update(model, model.metadata.namespace,`scale=${scaleCount}`)
    
  }
  public descale(model: Deployments){
    const scaleCount = model.status?.replicas  ? model.status?.replicas - 1 : 0
    this.service.update(model, model.metadata.namespace,`scale=${scaleCount}`)
    
  }

  //
public redeploy(model: Deployments){
  this.service.update(model,model.metadata.namespace,'restart=1')
}

public delete(model: Deployments){
  this.confirmationService.confirm({
    message: `Are you sure that you want to delete '${model.metadata.name}' ?`,
    accept: () => {
      const index = this.dataSource.findIndex(k=> k.metadata.name == model.metadata.name)
      this.dataSource[index].lastState.state = "Deleting.."
       this.service.delete(model.metadata.namespace,model.metadata.name)
       .then(res=> {
         this.notificationService.Add({
          type: NotificationTypes.SUCCESS,
          message: `${model.metadata.name} has been deleted`
         })
       })
    }
});
}

public details(element: Deployments){
  this.router.navigate([`/connections/${this.service.clusterId()}/namespaces/${element.metadata.namespace}/deployments/${element.metadata.name}`])
}

}
