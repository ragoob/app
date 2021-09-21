import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Notifications } from "../models/notifications";

@Injectable({providedIn: 'root'})
export class NotificationService{
   private defaultDuration: number = 5
   private defaultDismissible: boolean = true
    private Notifications$: Subject<Notifications> = new Subject()
    constructor(){

    }

    public Add(model: Notifications){
        if(!model.durationTime){
            model.durationTime = this.defaultDuration
        }
        if(model.dismissible == null){
            model.dismissible = this.defaultDismissible
        }
        this.Notifications$.next(model)
    }

    public get(): Observable<Notifications>{
        return this.Notifications$.asObservable()
    }

}