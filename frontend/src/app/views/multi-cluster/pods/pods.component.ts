import { Component, Input, OnInit } from '@angular/core';
import { Pods } from 'src/app/core/models/resources.result';

@Component({
  selector: 'app-pods',
  templateUrl: './pods.component.html',
  styleUrls: ['./pods.component.scss']
})
export class PodsComponent implements OnInit {
  @Input('dataSource')public dataSource: Pods[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
