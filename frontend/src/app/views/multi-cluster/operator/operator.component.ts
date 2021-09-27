import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { BASE_URL_TOKEN } from 'src/app/consts/config';
import { Deployments, Pods } from 'src/app/core/models/resources.result';
import { ClustersService } from 'src/app/core/services/clusters.service';
import { DeploymentsService } from 'src/app/core/services/deployments.service';
export interface multiClusterOperation{
  clusters?:  string[],
  kinds?: string,
  actions?: string,
  subscribeToResult?: boolean,
  scaleCount?: number,
  matchSelectorKey?: string,
  matchSelectorValue?: string,
  nameSpace?: string,
  searchOption?: string
}
@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {
  public results: Map<string,Deployments[] | Pods[]> = new Map()
  public model: multiClusterOperation = {}
  public clusters: SelectItem[] = []
  public kinds: SelectItem[] = [{
    label: "Deployments",
    value: "Deployments"
  },
  {
    label: "Pods",
    value: "Pods"
  }
]

public searchOptions: SelectItem[] = [{
  label: "All under name Space",
  value: "NameSpace"
},
{
  label: "All match selector",
  value: "selector"
}
]
public actions: SelectItem[] = [];
constructor( private clusterService: ClustersService,
  private deploymentService: DeploymentsService
  ) { }
  ngOnInit(): void {
   this.clusterService.get()
   .then(res=> {
     res.data.forEach(c=> {
       this.clusters.push({
         label: c.name,
         value: c.name
       })
     })
   })
  }

  public onKindChange(){
    this.actions = []
    this.actions.push(
      {
        label: "Delete",
        value: "Delete"
      }
    )
    switch(this.model.kinds){
     case "Deployments" : {
       this.actions.push(
       {
        label: "Restart",
        value: "Restart"
      },
        {
          label: "Change Scale",
          value: "Change Scale"
        }
       )
     }
    }
  }

 
  
  public find(){
    this.model.clusters
    .forEach(cl=> {
       this.deploymentService.getByClusterAndNameSpace(
         cl,this.model.nameSpace, (this.model.matchSelectorKey  && this.model.matchSelectorValue) ?
         `${this.model.matchSelectorKey}=${this.model.matchSelectorValue}` : ''
       ).then(res=> {
         alert(cl)
         this.results.set(cl,res.data.items)
         alert(JSON.stringify( this.results.get(cl)))
       })
    })
  }

}
