import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';
import { filter } from 'rxjs/operators';
import { ClusterResult } from 'src/app/core/models/clusters';
import { AuthService } from 'src/app/core/services/auth.service';
import { ClustersService } from 'src/app/core/services/clusters.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  constructor(private auth: AuthService,private clusterService: ClustersService, private router: Router,
    public loader: LoaderService
    ){}
  
  public sidebarMinimized = false;
  public navItems:INavData[] = navItems;

  ngOnInit(): void {
    if(!this.auth.currentUser().isAdmin){
      this.navItems = this.navItems.filter(c=> c.name != 'Management')
    }
    this.clusterService.akaMenu$.pipe(filter(res=> res != null))
    .subscribe(res=> {
      this.pushClusterMenuItem(res)
    })
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  public logOut(){
   this.auth.logOut()
  }

  private pushClusterMenuItem(res: ClusterResult){
    const currentUser = this.auth.currentUser()
    this.navItems[1].badge.text = `  ${res.data.length}`;
    this.navItems[1].children = res.data
    .filter(c=> currentUser.isAdmin || c.users.findIndex(u=> u.userId == currentUser.userId) > -1)
    .map(d=> {
      return {
        name: d.name,
        url: `/connections/${d.name}`,
        icon: 'c-icon cil-cloud',
        children: [
          {
            name: "Over view",
            icon: 'c-icon cil-bar-chart',
            url: `/connections/${d.name}`
          },
          {
          name: "Name spaces",
          icon: 'fa fa-shopping-basket',
          url: `/connections/${d.name}/namespaces`
        },
        {
          name: "Deployments",
          icon: 'fa fa-envelope-o',
          url: `/connections/${d.name}/namespaces/all/deployments`
        },
        {
          name: "Services",
          icon: "fa fa-wrench",
          url:`/connections/${d.name}/namespaces/all/services`

        },
       
        {
          name: "Pods",
          icon: 'fa fa-shopping-bag',
          url: `/connections/${d.name}/namespaces/all/pods`
        },
        {
          name: "Ingresses",
          icon: 'fa fa-globe',
          url: `/connections/${d.name}/namespaces/all/ingresses`
        },
        {
          name: "Secrets",
          icon: 'fa fa-user-secret',
          url: `/connections/${d.name}/namespaces/all/secrets`
        }
       ]
      } 
    })
  }
}
