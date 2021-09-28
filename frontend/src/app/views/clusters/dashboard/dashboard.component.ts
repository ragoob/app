import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { ClustersService } from 'src/app/core/services/clusters.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public clusterService: ClustersService,private router: Router) { }

  ngOnInit(): void {
    this.clusterService.get()
    this.router.events.subscribe((val) => {
     if(val instanceof NavigationEnd){
      this.clusterService.get()
     }
  });

    
  }

}
