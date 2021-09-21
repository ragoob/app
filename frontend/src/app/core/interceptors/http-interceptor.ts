import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { NotificationTypes } from "../models/notifications";
import { NotificationService } from "../services/notification.service";
@Injectable({providedIn: 'root'})
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private notificationService: NotificationService, private router: Router) {} 
   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
      const token = localStorage.getItem('token')
  
     if (token) {
       request = request.clone({
          setHeaders: {Authorization: `brearer ${token}`}
       });
    }
    return next.handle(request).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            this.raisError(err)
              if (err.status === 401 || err.status == 403) {
                this.router.navigate(["login"])
            
           }
        }
        return throwError(err);
      })
     )
    }

    private raisError(err: HttpErrorResponse): void{
      this.notificationService.Add({
         type: NotificationTypes.ERROR,
         message: typeof(err.error) == 'string' ?  err.error: err.error.text,
         dismissible: true
         
      })
    }
  }
  
