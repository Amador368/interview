import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import * as UsersActions from './users.actions';

@Injectable()
export class UsersEffects {

    getUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.getUsers),
            switchMap(() => {
            try {
                  
                return this.userService.getUsers().pipe(
                map((users) => UsersActions.getUsersSuccess({ users })),
                catchError((error) => of(UsersActions.getUsersFailure({ error })))
                );
              
            } catch (error) {                
                return of(UsersActions.getUsersFailure({ error: 'Error al cargar usuarios' }));
            }
            })
        )
    );

    getUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.getUser),
            switchMap(() => {
            try {
                return this.userService.getUser().pipe(
                map((user) => UsersActions.getUserSuccess({ user })),
                catchError((error) => of(UsersActions.getUserFailure({ error })))
                );
            } catch (error) {
                return of(UsersActions.getUserFailure({ error: 'Error al cargar usuario' }));
            }
            })
        )
    );

    addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.addUser),
            switchMap(({ user }) => {
            try {
                return this.userService.addUser(user).pipe(
                map((user) => UsersActions.addUserSuccess({ user })),
                catchError((error) => of(UsersActions.addUserFailure({ error })))
                );
            } catch (error) { 
                return of(UsersActions.addUserFailure({ error: 'Error al agregar usuario' }));
            }
            })
        )
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.updateUser),
            switchMap(({ user }) => {
            try {
                return this.userService.updateUser(user).pipe(
                map((user) => UsersActions.updateUserSuccess({ user })),
                catchError((error) => of(UsersActions.updateUserFailure({ error })))
                );
            } catch (error) {
                return of(UsersActions.updateUserFailure({ error: 'Error al actualizar usuario' }));
            }
            })
        )
    );

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.deleteUser),
            switchMap(({ id }) => {
            try {
                return this.userService.deleteUser(id).pipe(
                map((user) => UsersActions.deleteUserSuccess({ user })),
                catchError((error) => of(UsersActions.deleteUserFailure({ error })))
                );
            } catch (error) {
                return of(UsersActions.deleteUserFailure({ error: 'Error al eliminar usuario' }));
            }
            })
        )
    );

    deleteUserSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.deleteUserSuccess),
            tap(() => {
                this.snackBar.open('Usuario eliminado exitosamente', 'Cerrar', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                });
            })
        ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions, 
        private userService: UserService,
        private snackBar: MatSnackBar
    ) {}
}

