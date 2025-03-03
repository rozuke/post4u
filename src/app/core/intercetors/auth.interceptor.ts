import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const excludedUrls = ['/auth/login', '/auth/signup'];

  if (excludedUrls.some(url => req.url.includes(url))) {
    return next(req);
  }

  const token = 'token';

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
