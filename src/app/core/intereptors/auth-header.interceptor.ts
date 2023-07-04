import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { finalize, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';


@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(
        private injector: Injector,
        private userSvc: UserService,
        private notify: NotificationService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req.headers.append('handleError', 'onService');
        const started = Date.now();
        let ok: string;
        let event1:any = null;
        // extend server response observable with logging
        return next.handle(req).pipe(
            tap(
                // Succeeds when there is a response; ignore other events
                event => {
                    ok = event instanceof HttpResponse ? 'succeeded' : '';
                    event1 = event;
                },
                // Operation failed; error is an HttpErrorResponse
                error => {
                    ok = 'failed';
                    event1 = error;
                },
            ),
            // Log when response observable either completes or errors
            finalize(() => {
                if (event1 && (event1.error && event1.error.name === "TokenExpiredError")) {
                    this.notify.showError("Your session was expired. Please log in again");
                    this.userSvc.logOut();
                }
            }),
        );
    }
}
