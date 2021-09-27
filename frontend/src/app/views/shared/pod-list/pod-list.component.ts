import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NotificationTypes } from 'src/app/core/models/notifications';
import { Pods, ResourcesUtils, ResourceTypes } from 'src/app/core/models/resources.result';
import { RealTimeEventsService } from 'src/app/core/services/events.realtime.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PodsService } from 'src/app/core/services/pods.service';

@Component({
  selector: 'app-pod-list',
  templateUrl: './pod-list.component.html',
  styleUrls: ['./pod-list.component.scss']
})
export class PodListComponent implements OnInit {
  @Input('selector') public selector: string = "";
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1)
  dataSource: Pods[] = []
  constructor(public service: PodsService,
     private util: ResourcesUtils,
      private eventService: RealTimeEventsService<Pods>,
      private confirmationService: ConfirmationService,
      private notificationService: NotificationService

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
      filter(e=> !!e && (e.NameSpace == this.service.NameSpacesId() || this.service.NameSpacesId() == 'all') 
      && e.Resource == ResourceTypes.RESOUCETYPE_PODS
      ),
      takeUntil(this.destroyed$)
      ).subscribe(e=> {
      this.load()
    })
   
    this.load()
  }

  private load(): void{
    this.service.get(this.selector)
    .then(res=> {
      this.dataSource = res.data.items
    })
  }




public delete(model: Pods){
  this.confirmationService.confirm({
    message: `Are you sure that you want to delete '${model.metadata.name}' ?`,
    accept: () => {
      const index = this.dataSource.findIndex(k=> k.metadata.name == model.metadata.name)
      this.dataSource[index].status.phase = "Deleting.."
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
  
}
