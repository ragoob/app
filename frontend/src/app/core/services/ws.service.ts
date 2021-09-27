import { Injectable } from "@angular/core";
import { Observable, Observer, Subject } from "rxjs";
import { NotificationService } from "./notification.service";

@Injectable()
export class WebSocketService<T> {
 constructor(private notification: NotificationService){}
  public connect(url): Subject<MessageEvent> {
    
    return this.create(url);
    
   
  }
  
  private create(url): Subject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onopen = ()=>{
        this.notification.info(`Socket connecting to ${url}`)
      }
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = (event)=> {
        this.notification.error("Socket connection error")
        obs.error.bind(obs)
      };
      ws.onclose = (e)=> {
      this.notification.warning(`Socket disconnected from ${url}`)
        obs.complete.bind(obs)
      };
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }

}