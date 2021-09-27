import { Component, OnInit } from '@angular/core';
import { Deployments } from 'src/app/core/models/resources.result';
import { DeploymentsService } from 'src/app/core/services/deployments.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public model: Deployments
  public selector: string
  constructor(private service: DeploymentsService) { }

  ngOnInit(): void {
    
    this.service.getOne( this.service.NameSpacesId(), this.service.DeploymentId())
    .then(res=> {
         this.model = res.data;
      
        Object.keys(this.model.spec.selector.matchLabels)
        .forEach(k=>{
         if(!this.selector){
           this.selector = `${k}=${this.model.metadata.labels[k]};`
         }else{
           this.selector += `${k}=${this.model.metadata.labels[k]};`
         }
        })
    })
  }

}
