import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import {ClipboardModule} from '@angular/cdk/clipboard';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      title: 'List'
    },

  },

  {
    path: 'details/:id',
    component: DetailsComponent,
    data: {
      title: 'Details'
    },

  },

  {
    path: 'register',
    component: DetailsComponent,
    data: {
      title: 'Details'
    },

  },

];

@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ClipboardModule

  ]
})
export class ClustersModule { }
