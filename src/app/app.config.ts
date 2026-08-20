import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { rolesReducer } from './roles/store/roles.reducer';
import { RolesEffects } from './roles/store/roles.effects';
import { DateFormat } from './interfaces/date-format.interface';
import { DateFormatService } from './date-format.service';
import { UsDateFormatService } from './us-date-format.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { usersReducer } from './users/store/users.reducer';
import { UsersEffects } from './users/store/users.effects';
import { erpAppInterceptor } from './interceptors/app.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([erpAppInterceptor])
    ),
    provideStore({ roles: rolesReducer, users: usersReducer }),
    provideEffects([RolesEffects, UsersEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideAnimationsAsync(),    
  ]
};
