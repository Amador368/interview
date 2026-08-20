import { createAction, props } from '@ngrx/store';
import { User } from '../users/models/user.model';

// Load User
export const getUser = createAction('[App] Get User');
export const getUserSuccess = createAction('[App] Get User Success', props<{ user: User }>());
export const getUserFailure = createAction('[App] Get User Failure', props<{ error: string }>());