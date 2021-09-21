import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverViewCardsComponent } from '../dashboard/over-view-cards/over-view-cards.component';
import { MbToGbPipe } from 'src/app/core/pipes/mb-to-gb.pipe';
import { PercentageToProgressColorPipe } from 'src/app/core/pipes/progress-class.pipe';
import { NotificationsComponent } from './notifications/notifications.component';
import { RelativeTimeFilterPipe } from 'src/app/core/pipes/relative-time.pipe';
import { CompontentsOverViewComponent } from '../clusters/compontents-over-view/compontents-over-view.component';
import { ClusterEventsComponent } from '../clusters/cluster-events/cluster-events.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab


@NgModule({
  declarations: [OverViewCardsComponent,MbToGbPipe,PercentageToProgressColorPipe,RelativeTimeFilterPipe,
     NotificationsComponent,CompontentsOverViewComponent,ClusterEventsComponent, DynamicFormComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    TableModule,
    AccordionModule,
  ],
  exports: [AccordionModule,TableModule,MatTableModule,MatPaginatorModule,MatDialogModule,ReactiveFormsModule, OverViewCardsComponent,MbToGbPipe,PercentageToProgressColorPipe,RelativeTimeFilterPipe,NotificationsComponent,CompontentsOverViewComponent,ClusterEventsComponent],
  entryComponents: [OverViewCardsComponent,NotificationsComponent,CompontentsOverViewComponent]
})
export class SharedModule { }
