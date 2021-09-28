import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperatorComponent } from './operator/operator.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DeploymentsComponent } from './deployments/deployments.component';

const routes: Routes = [
  {
    path: '',
    component: OperatorComponent,
    
  }
];



@NgModule({
  declarations: [
    OperatorComponent,
    DeploymentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MultiClusterModule { }
