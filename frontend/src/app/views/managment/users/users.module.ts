import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../../shared/shared.module';
import { DetailsComponent } from './details/details.component';

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
      title: 'Register New users'
    },

  },
 
];

@NgModule({
  declarations: [ListComponent, DetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    
  ]
})
export class UsersModule { }
