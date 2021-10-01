import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverViewCardsComponent } from '../dashboard/over-view-cards/over-view-cards.component';
import { MbToGbPipe } from 'src/app/core/pipes/mb-to-gb.pipe';
import { PercentageToProgressColorPipe } from 'src/app/core/pipes/progress-class.pipe';
import { RelativeTimeFilterPipe } from 'src/app/core/pipes/relative-time.pipe';
import { CompontentsOverViewComponent } from '../clusters/compontents-over-view/compontents-over-view.component';
import { ClusterEventsComponent } from '../clusters/cluster-events/cluster-events.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { PhaseToBadge } from 'src/app/core/pipes/phase-to-badge';
import { DeploymentListComponent } from './deployment-list/deployment-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { LoadFromYamlFormComponent } from './load-from-yaml-form/load-from-yaml-form.component';
import { DropdownModule } from 'primeng/dropdown';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PodListComponent } from './pod-list/pod-list.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [OverViewCardsComponent, MbToGbPipe, PercentageToProgressColorPipe, RelativeTimeFilterPipe,
    CompontentsOverViewComponent, ClusterEventsComponent, DynamicFormComponent, PhaseToBadge, DeploymentListComponent, BreadcrumbComponent, LoadFromYamlFormComponent, PodListComponent, LoaderComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    TableModule,
    AccordionModule,
    MatTooltipModule,
    MatTabsModule,
    ToolbarModule,
    ConfirmDialogModule,
    RouterModule,
    DropdownModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MultiSelectModule,
    FormsModule,
    MatCheckboxModule,
    MatProgressBarModule



  ],
  providers: [ConfirmationService],
  exports: [AccordionModule, TableModule, MatTableModule, MatPaginatorModule, MatDialogModule,
    OverViewCardsComponent, MbToGbPipe, PercentageToProgressColorPipe, RelativeTimeFilterPipe
    , CompontentsOverViewComponent, ClusterEventsComponent, BreadcrumbComponent,
    PhaseToBadge, DeploymentListComponent, MatTooltipModule, MatTabsModule,
    ToolbarModule, ConfirmDialogModule, DropdownModule, MatMenuModule, MatButtonModule, MatIconModule,
    PodListComponent, MultiSelectModule, MatCheckboxModule, MatProgressBarModule, LoaderComponent, ReactiveFormsModule,
    FormsModule],
  entryComponents: [OverViewCardsComponent, CompontentsOverViewComponent]
})
export class SharedModule { }
