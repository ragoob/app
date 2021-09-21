import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1)
  displayedColumns: string[] = ["nameSpace","type","objectName","reason","lastTimestamp","message"];
  dataSource = new MatTableDataSource<Events>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private changeDetectorRefs: ChangeDetectorRef,private eventService: EventsService) { }

  ngOnInit(): void {
    this.eventService.result$
    .pipe(filter(res=> res != null),
     takeUntil(this.destroyed$)
    )
    .subscribe(res=> {
      this.dataSource = new MatTableDataSource<Events>(res.data.items)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.changeDetectorRefs.detectChanges();
    })
    this.eventService.get()
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
