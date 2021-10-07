import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: 'clusters',
    data: {
      title: 'Clusters'
    },
    loadChildren: () => import('../managment/clusters/clusters.module').then(m => m.ClustersModule)
  },
  {
    path: 'users',
    data: {
      title: 'Users'
    },
    loadChildren: () => import('../managment/users/users.module').then(m => m.UsersModule)
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ManagmentModule { }
