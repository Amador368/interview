import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const getUser = createAction('[User] Get User');
export const getUserSuccess = createAction('[User] Get User Success', props<{ user: User }>());
export const getUserFailure = createAction('[User] Get User Failure', props<{ error: string }>());

export const getUsers = createAction('[User] Get Users');
export const getUsersSuccess = createAction('[User] Get Users Success', props<{ users: User[] }>());
export const getUsersFailure = createAction('[User] Get Users Failure', props<{ error: string }>());

export const addUser = createAction('[User] Add User', props<{ user: User }>());
export const addUserSuccess = createAction('[User] Add User Success', props<{ user: User[] }>());
export const addUserFailure = createAction('[User] Add User Failure', props<{ error: string }>());

export const updateUser = createAction('[User] Update User', props<{ user: User }>());
export const updateUserSuccess = createAction('[User] Update User Success', props<{ user: User[] }>());
export const updateUserFailure = createAction('[User] Update User Failure', props<{ error: string }>());

export const deleteUser = createAction('[User] Delete User', props<{ id: string }>());
export const deleteUserSuccess = createAction('[User] Delete User Success', props<{ user: User[] }>());
export const deleteUserFailure = createAction('[User] Delete User Failure', props<{ error: string }>());
