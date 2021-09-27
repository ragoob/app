import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Events } from 'src/app/core/models/resources.result';
import { EventsService } from 'src/app/core/services/events.service';

@Component({
  selector: 'app-cluster-events',
  templateUrl: './cluster-events.component.html',
  styleUrls: ['./cluster-events.component.scss']
})
export class ClusterEventsComponent implements OnInit , AfterViewInit ,OnDestroy {
  @Input('objectType') public objectType?: string;
  @Input('objectName') public objectName?: string;
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1)
  dataSource: Events[] = []
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private eventService: EventsService) { }

  ngOnInit(): void {
    this.eventService.result$
    .pipe(filter(res=> res != null 
      && (res.data.items.findIndex(c=> 
        (c.involvedObject.name == this.objectName || !this.objectName) && 
        (c.involvedObject.kind == this.objectType || !this.objectType)) > -1 )
      ),
     takeUntil(this.destroyed$)
    )
    .subscribe(res=> {
      this.dataSource =res.data.items
    })
    this.eventService.get()
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
  
  ngAfterViewInit() {
  
  }


}
