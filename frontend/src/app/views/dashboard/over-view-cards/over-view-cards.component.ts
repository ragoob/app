import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClusterResult } from 'src/app/core/models/clusters';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-over-view-cards',
  templateUrl: './over-view-cards.component.html',
  styleUrls: ['./over-view-cards.component.scss']
})
export class OverViewCardsComponent implements OnInit,OnDestroy{
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1)
  constructor(){

  }
  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
  ngOnInit(): void {
    // this.ws.connect<ClusterResult>(`${environment.ws}${environment.sockets.health}`)
    // .pipe(takeUntil(this.destroyed$))
    // .subscribe(msg=>{
    //   this.result = msg
    // })
  }
  @Input('data') result: ClusterResult
  @Input('all') all?: boolean

}
