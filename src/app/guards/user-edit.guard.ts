import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const userEditGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const id = Number(route.paramMap.get('id'));

  if (!id || isNaN(id)) {
    router.navigate(['/users']);
    return false;
  }
  if (Number(id) > 10) {
    return router.createUrlTree(['/users']);
  }
  return true;
};
