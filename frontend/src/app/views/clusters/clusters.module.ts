import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NodeListComponent } from './node-list/node-list.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    },
    
  },

  {
    path: 'namespaces',
    data: {
      title: 'Name Spaces'
    },
    loadChildren: () => import('../name-space/name-space.module').then(m => m.NameSpaceModule)
  },
  {
    path: 'namespaces/:id/deployments',
    data: {
      title: 'Deployments'
    },
    loadChildren: () => import('../deployments/deployments.module').then(m => m.DeploymentsModule)
  },

  {
    path: 'namespaces/:id/pods',
    data: {
      title: 'Deployments'
    },
    loadChildren: () => import('../pods/pods.module').then(m => m.PodsModule)
  },

  {
    path: 'namespaces/:id/ingresses',
    data: {
      title: 'Ingresses'
    },
    loadChildren: () => import('../ingresses/ingresses.module').then(m => m.IngressesModule)
  },

  {
    path: 'namespaces/:id/services',
    data: {
      title: 'services'
    },
    loadChildren: () => import('../services/services.module').then(m => m.ServicesModule)
  },
  {
    path: 'namespaces/:id/secrets',
    data: {
      title: 'Secrets'
    },
    loadChildren: () => import('../secrets/secrets.module').then(m => m.SecrestsModule)
  }
];



@NgModule({
  declarations: [
    DashboardComponent,
    NodeListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
   
  ]
})
export class ClustersModule { }
