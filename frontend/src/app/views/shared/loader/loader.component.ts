import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit ,OnDestroy {
  public isLoading: boolean = false;
  private destroyed$: Subject<boolean> = new Subject()
  constructor(private loaderService: LoaderService) { }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.loaderService.loading$
    .pipe(takeUntil(this.destroyed$))
    .subscribe(res=> this.isLoading = res)
  }

}
