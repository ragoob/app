import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Notifications } from 'src/app/core/models/notifications';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  public notifications: Notifications[] = []
  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notifications = []
    this.notificationService.get()
    .pipe(filter(res=> res != null))
    .subscribe(res=> {
     const index =   this.notifications.findIndex(m=> m.message == res.message && m.type == res.type)
     if (index > -1 ){
       this.notifications.splice(index,1)
     }
     this.notifications.push(res)
    })
  }

  public close(index: number){
    this.notifications.splice(index,1)
  }
}
