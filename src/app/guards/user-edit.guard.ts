import { CanActivateFn } from '@angular/router';

export const userEditGuard: CanActivateFn = (route, state) => {
  return true;
};
