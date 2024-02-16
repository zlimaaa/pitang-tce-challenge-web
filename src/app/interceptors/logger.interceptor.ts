import { HttpInterceptorFn } from '@angular/common/http';
import { Auth } from '../pages/auth/classes/auth.model';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const session = localStorage.getItem('session')
  let auth: Auth = new Auth("","");

  if(session)
     auth = JSON.parse(session);

  const authRequest = req.clone({
    headers: req.headers.set('Authorization',`Bearer ${auth.token}`),
  });
  
  return next(authRequest);
};
