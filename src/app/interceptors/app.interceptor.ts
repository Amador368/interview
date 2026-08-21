import { HttpInterceptorFn } from '@angular/common/http';

export const erpAppInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    setHeaders: {
      'X-ERP-APP': 'testing'
    }
  });

  return next(clonedRequest);
};