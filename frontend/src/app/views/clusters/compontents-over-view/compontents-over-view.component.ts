import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IngressesService } from 'src/app/core/services/ingresses.service';
import { SecretsService } from 'src/app/core/services/secrets.service';
import { ServicesService } from 'src/app/core/services/services.service';
import { DeploymentsService } from '../../../core/services/deployments.service';
import { NameSpaceService } from '../../../core/services/namespace.service';
import { NodesService } from '../../../core/services/nodes.service';
import { PodsService } from '../../../core/services/pods.service';

@Component({
  selector: 'app-compontents-over-view',
  templateUrl: './compontents-over-view.component.html',
  styleUrls: ['./compontents-over-view.component.scss']
})
export class CompontentsOverViewComponent implements OnInit {
  public showNameSpaces: boolean
   public counters: {
    RESOUCETYPE_NODES: number,
    RESOUCETYPE_NAMESPACES: number,
    RESOUCETYPE_PODS: number,
    RESOUCETYPE_DEPLOYMENTS: number,
    RESOUCETYPE_SERVICES: number,
    RESOUCETYPE_INGRESS: number,
    RESOUCETYPE_SECRETS: number

   } = {
    RESOUCETYPE_NODES: 0,
    RESOUCETYPE_NAMESPACES: 0,
    RESOUCETYPE_PODS: 0,
    RESOUCETYPE_DEPLOYMENTS: 0,
    RESOUCETYPE_SERVICES: 0,
    RESOUCETYPE_INGRESS: 0,
    RESOUCETYPE_SECRETS: 0
   }
  constructor(private nameSpaceService: NameSpaceService,
    private nodeService: NodesService,
    private deploymentService: DeploymentsService,
    private serviceService: ServicesService,
    private podService: PodsService,
    private ingressService: IngressesService,
    private secretsService: SecretsService) {
      this.showNameSpaces = this.nameSpaceService.NameSpacesId() == "all"
     }

  ngOnInit(): void {
    
    this.nameSpaceService.get()
    .then(res=> this.counters.RESOUCETYPE_NAMESPACES = res.data.items.length)
    this.nodeService.get().then(res=> this.counters.RESOUCETYPE_NODES = res.length)
    this.deploymentService.get().then(res=> this.counters.RESOUCETYPE_DEPLOYMENTS = res.data.items.length)
    this.podService.get().then(res=> this.counters.RESOUCETYPE_PODS = res.data.items.length)
    this.serviceService.get().then(res=> this.counters.RESOUCETYPE_SERVICES = res.data.items.length)
    this.ingressService.get().then(res=> this.counters.RESOUCETYPE_INGRESS = res.data.items.length)
    this.secretsService.get().then(res=> this.counters.RESOUCETYPE_SECRETS = res.data.items.length)
  }

}
