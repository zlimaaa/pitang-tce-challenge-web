import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../pages/auth/classes/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService); 

  return authService.hasUserLoggedin() ? true : router.navigate(['/login']);
};