import { HttpInterceptorFn } from '@angular/common/http';
import { APP_CONFIG } from '../../app.config';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({
    setHeaders: {
      'x-api-key': APP_CONFIG.API_KEY
    }
  });

  return next(apiReq);
};
