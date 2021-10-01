// loader-interceptor.service.ts
import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { NotificationService } from '../services/notification.service';
import { NotificationTypes } from '../models/notifications';
import { Router } from '@angular/router';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: LoaderService,private notificationService: NotificationService,private router: Router) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.loading$.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token')
  
    if (token) {
      req = req.clone({
         setHeaders: {Authorization: `brearer ${token}`}
      });
   }
    this.requests.push(req);
    this.loaderService.loading$.next(true);
    return Observable.create(observer => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => {
           this.raisError(err)
            this.removeRequest(req);
            observer.error(err);
          },
          () => {
            this.removeRequest(req);
            observer.complete();
          });
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }

  
  private raisError(err: HttpErrorResponse): void{
    if(err instanceof HttpErrorResponse){
      if(err.status == 403 || err.status == 401){
        this.router.navigate(["login"])
        return
      }
      this.notificationService.Add({
        type: NotificationTypes.ERROR,
        message: typeof(err.error) == 'string' ?  err.error: err.error.text,
        dismissible: true
        
     })
    }
    
  }
}
