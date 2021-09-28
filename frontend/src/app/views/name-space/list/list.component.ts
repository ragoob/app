import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { observable, ReplaySubject } from 'rxjs';
import { catchError, filter, map, takeUntil, tap } from 'rxjs/operators';
import { DialogData } from 'src/app/core/models/dialog-data';
import { EventStream } from 'src/app/core/models/event-stream';
import { NotificationTypes } from 'src/app/core/models/notifications';
import { EventsTypes, NameSpace, ResourceTypes } from 'src/app/core/models/resources.result';
import { RealTimeEventsService } from 'src/app/core/services/events.realtime.service';
import { NameSpaceService } from 'src/app/core/services/namespace.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent   implements OnInit , AfterViewInit ,OnDestroy {
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1)
  displayedColumns: string[] = ["state","name","date"];
  public dataSource:NameSpace[] = []

  constructor(private nameSpaceService: NameSpaceService,
    private router:Router,public dialog: MatDialog,
    private eventService: RealTimeEventsService<NameSpace>,
    private confirmationService: ConfirmationService,
    private notificationService: NotificationService
  
    ) { 
    
  }
  ngOnInit(): void {
    this.eventService.subscribe()
    this.eventService.messages
    .pipe(
      takeUntil(this.destroyed$),
      filter(e=> !!e &&  e.ClusterId == this.nameSpaceService.clusterId() && e.Resource == ResourceTypes.RESOUCETYPE_NAMESPACES)
    )
    .subscribe(c=> {
     this.load()
    })

    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        if(this.nameSpaceService.clusterId() && this.nameSpaceService.clusterId() != ""){
          this.load()
        }
        
      }
   });

    this.load()
    
  }

  private load(): void{
    this.nameSpaceService.get()
    .then(res=> this.dataSource = res.data.items)
  }
 
  public details(id: string): void{
    this.router.navigate([`/connections/${this.nameSpaceService.clusterId()}/namespaces/${id}`])
  }
  ngOnDestroy(): void {
   this.destroyed$.next(true)
   this.destroyed$.complete()
  }
  ngAfterViewInit(): void {


  }

 public delete(name: string){
  this.confirmationService.confirm({
    message: `Are you sure that you want to delete '${name}' ?`,
    accept: () => {
      const index = this.dataSource.findIndex(k=> k.metadata.name == name)
      this.dataSource[index].status.phase = "Deleting.."
       this.nameSpaceService.delete(name)
       .then(res=> {
         this.notificationService.Add({
          type: NotificationTypes.SUCCESS,
          message: `${name} has been deleted`
         })
       })
    }
});
 }
  public addNew(){
    const dialogRef = this.dialog.open(DynamicFormComponent, {
     width: '50%',

      data: {
          title: "Add new Name space",
          columns: [{
            name: "name",
            description: "Name.",
            required: true,
          },
          
        ],
      } as DialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.success){
        this.nameSpaceService.create(result.data.name)
        this.notificationService.Add({
          type: NotificationTypes.SUCCESS,
          message: `${result.data.name} has been added`
         })
      }
    });
  }
}
