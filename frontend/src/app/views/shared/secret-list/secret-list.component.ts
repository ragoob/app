import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NotificationTypes } from 'src/app/core/models/notifications';
import { Secrets, ResourcesUtils, ResourceTypes } from 'src/app/core/models/resources.result';
import { AuthService } from 'src/app/core/services/auth.service';
import { SecretsService } from 'src/app/core/services/secrets.service';
import { RealTimeEventsService } from 'src/app/core/services/events.realtime.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-secret-list',
  templateUrl: './secret-list.component.html',
  styleUrls: ['./secret-list.component.scss']
})
export class SecretListComponent implements OnInit , AfterViewInit ,OnDestroy {
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1)
  dataSource: Secrets[] = []
  constructor(public service: SecretsService,
     private util: ResourcesUtils,
      private eventService: RealTimeEventsService<Secrets>,
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
      filter(e=> !!e && (e.NameSpace == this.service.NameSpacesId() || this.service.NameSpacesId() == 'all') && e.Resource == ResourceTypes.RESOUCETYPE_SECRETS),
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
      this.dataSource = res.data.items
    })
  }




public delete(model: Secrets){
  this.confirmationService.confirm({
    message: `Are you sure that you want to delete '${model.metadata.name}' ?`,
    accept: () => {
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
