import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Notifications, NotificationTypes } from "../models/notifications";

@Injectable({providedIn: 'root'})
export class NotificationService{

    constructor(private toastr: ToastrService){

    }

    public Add(model: Notifications){
       switch(model.type){
           case NotificationTypes.SUCCESS:{
            this.toastr.success(model.message, '')
             break;
           }

           case NotificationTypes.ERROR:{
            this.toastr.error(model.message, '')
             break;
           }

           case NotificationTypes.WARNING:{
            this.toastr.warning(model.message, '')
             break;
           }

           case NotificationTypes.INFO:{
            this.toastr.info(model.message, '')
             break;
           }
       }
    }


    public error(message: string){
     this.Add({
         message: message,
         type: NotificationTypes.ERROR,
         dismissible: true,
         durationTime: 5
     })
    }

    public info(message: string){
        this.Add({
            message: message,
            type: NotificationTypes.INFO,
            dismissible: true,
            durationTime: 5
        })
       }

       
    public warning(message: string){
        this.Add({
            message: message,
            type: NotificationTypes.WARNING,
            dismissible: true,
            durationTime: 5
        })
       }

       public success(message: string){
        this.Add({
            message: message,
            type: NotificationTypes.SUCCESS,
            dismissible: true,
            durationTime: 5
        })
       }
}