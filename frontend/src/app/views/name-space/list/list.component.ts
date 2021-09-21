import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { eventNames } from 'process';
import { observable, ReplaySubject } from 'rxjs';
import { catchError, filter, map, takeUntil, tap } from 'rxjs/operators';
import { DialogData } from 'src/app/core/models/dialog-data';
import { EventStream } from 'src/app/core/models/event-stream';
import { EventsTypes, NameSpace, ResourceTypes } from 'src/app/core/models/resources.result';
import { RealTimeEventsService } from 'src/app/core/services/events.realtime.service';
import { NameSpaceService } from 'src/app/core/services/namespace.service';
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
    private eventService: RealTimeEventsService<NameSpace>
  
    ) { 
    
  }
  ngOnInit(): void {
    this.eventService.messages
    .pipe(
      takeUntil(this.destroyed$),
      filter(e=> e.ClusterId == this.nameSpaceService.clusterId() && e.Resource == ResourceTypes.RESOUCETYPE_NAMESPACES))
    .subscribe(c=> {
      this.handleEvents(c)
    })
    this.nameSpaceService.get()
    .then(res=> this.dataSource = res.data.items)
  }

 
  public details(id: string): void{
    this.router.navigate([`/clusters/${this.nameSpaceService.clusterId()}/namespaces/${id}`])
  }
  ngOnDestroy(): void {
   this.destroyed$.next(true)
   this.destroyed$.complete()
  }
  ngAfterViewInit(): void {


  }

 
  public addNew(){
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: '450px',
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
      }
    });
  }

  private handleEvents(res: EventStream<NameSpace>){
      const index = this.dataSource.findIndex(n=> n.metadata.uid == res.PayLoad.metadata.uid)
      const data = []
      Object.assign(data,this.dataSource)
        if(res.EventName == EventsTypes.Modified){
           if(index == -1){
            data.push(res.PayLoad)
           }else{
             data[index] = res.PayLoad
           }
        }else if (res.EventName == EventsTypes.Deleted){
          data.splice(index,1)
        }

        this.dataSource = data
    
  }
  

}
