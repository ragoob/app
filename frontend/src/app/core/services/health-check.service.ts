import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ClusterResult } from "../models/clusters";
import { EventStream } from "../models/event-stream";
import { AuthService } from "./auth.service";
import { WebSocketService } from "./ws.service";

@Injectable({providedIn:'root'})
export class HealthCheckService{
    private url: string = `${environment.ws}${environment.sockets.health}`
    public messages: Observable<ClusterResult>

    constructor(private readonly wsService: WebSocketService<EventStream<ClusterResult>>, private auth : AuthService){
        
    }

    public subscribe(){
        this.messages = this.wsService.connect(this.url)
        .pipe(map(m=> {
            if(m && m.data){
               try {
                const data = JSON.parse(m.data) as ClusterResult
                const user = this.auth.currentUser();
                if(!user.isAdmin){
                    data.data = data.data.filter(c=> {
                        c.users.findIndex(u=> u.userId == user.userId) > -1
                      })
                }
                
                return data
               } catch (error) {
                return null
               }
            }

            return null
           
        }))
    }
   
}