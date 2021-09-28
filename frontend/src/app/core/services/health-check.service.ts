import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ClusterResult, Clusters } from "../models/clusters";
import { EventStream } from "../models/event-stream";
import { BaseResource } from "../models/resources.result";
import { WebSocketService } from "./ws.service";

@Injectable({providedIn:'root'})
export class HealthCheckService{
    private url: string = `${environment.ws}${environment.sockets.health}`
    public messages: Observable<ClusterResult>

    constructor(private readonly wsService: WebSocketService<EventStream<ClusterResult>>){
        this.messages = this.wsService.connect(this.url)
        .pipe(map(m=> {
            const data = JSON.parse(m.data) as  ClusterResult
            return data
        }))
    }
   
}