import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ERROR_MESSAGES } from '../constants/error-message';
import { ToastService } from '../services/toast/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toast: ToastService) {}

intercept(req: HttpRequest<any>, next: HttpHandler) {

  return next.handle(req).pipe(
    catchError((error: HttpErrorResponse) => {

      let message = 'Something went wrong';

      if (!navigator.onLine) {
        message = 'Internet connection lost';
      } else if (error.status === 401) {
        message = 'Unauthorized access';
      } else if (error.status === 404) {
        message = 'Data not found';
      } else if (error.status >= 500) {
        message = 'Server error';
      }

      this.toast.show(message);

      return throwError(() => error);
    })
  );
}

}
