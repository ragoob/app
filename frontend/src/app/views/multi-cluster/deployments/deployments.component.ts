import { Component, Input, OnInit } from '@angular/core';
import { Deployments } from 'src/app/core/models/resources.result';

@Component({
  selector: 'app-deployments',
  templateUrl: './deployments.component.html',
  styleUrls: ['./deployments.component.scss']
})
export class DeploymentsComponent implements OnInit {
 @Input('dataSource')public dataSource: Deployments[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
