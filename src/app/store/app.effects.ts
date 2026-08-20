
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from '../users/services/user.service';
import * as AppActions from './app.actions';

@Injectable()

export class AppEffects {
    getUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.getUser),
            switchMap(() => {
            try {
                return this.userService.getUser().pipe(
                map((user) => AppActions.getUserSuccess({ user })),
                catchError((error) => of(AppActions.getUserFailure({ error })))
                );
            } catch (error) {
                return of(AppActions.getUserFailure({ error: 'Error al cargar usuario' }));
            }
            })
        )
    );

    constructor(
        private actions$: Actions, 
        private userService: UserService
    ) {}
}