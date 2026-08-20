import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

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

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ roles: rolesReducer }),
    provideEffects([RolesEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideAnimationsAsync(),    
  ]
};
