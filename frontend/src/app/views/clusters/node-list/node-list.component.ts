import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Nodes } from 'src/app/core/models/resources.result';
import { NodesService } from 'src/app/core/services/nodes.service';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.scss']
})
export class NodeListComponent implements OnInit , AfterViewInit ,OnDestroy{
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1)
  displayedColumns: string[] = ["name","provider","address","cpu","memory","pods"];
  dataSource = new MatTableDataSource<Nodes>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private changeDetectorRefs: ChangeDetectorRef,private nodeService: NodesService) { }
  ngOnInit(): void {
    this.nodeService.result$
    .pipe(filter(res=> res != null),
     takeUntil(this.destroyed$)
    )
    .subscribe(res=> {
      this.dataSource = new MatTableDataSource<Nodes>(res)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.changeDetectorRefs.detectChanges();
    })

    this.nodeService.get()
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
