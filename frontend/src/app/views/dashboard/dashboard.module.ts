import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { OverViewCardsComponent } from './over-view-cards/over-view-cards.component';
import { CommonModule } from '@angular/common';
import { ClusterListComponent } from './cluster-list/cluster-list.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MbToGbPipe } from 'src/app/core/pipes/mb-to-gb.pipe';
import { ClusterUsageComparisonComponent } from './cluster-usage-comparison/cluster-usage-comparison.component';
import { PercentageToProgressColorPipe } from 'src/app/core/pipes/progress-class.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    MatTableModule,
    MatPaginatorModule,
    ButtonsModule.forRoot(),
    SharedModule
  ],
  declarations: [ DashboardComponent, ClusterListComponent,ClusterListComponent, ClusterUsageComparisonComponent ],
  entryComponents: [ClusterListComponent],
  exports: [ClusterListComponent]
})
export class DashboardModule { }
