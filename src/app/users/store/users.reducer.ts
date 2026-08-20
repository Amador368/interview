import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import * as UsersActions from './users.actions';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const usersReducer = createReducer(
  initialState,

  on(UsersActions.getUsers, state => ({ ...state, loading: true, error: null })),
  on(UsersActions.getUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
  on(UsersActions.getUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(UsersActions.addUser, state => ({ ...state, loading: true })),
  on(UsersActions.addUserSuccess, (state, { user }) => ({ ...state, users: user, loading: false })),
  on(UsersActions.addUserFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(UsersActions.updateUser, state => ({ ...state, loading: true })),
  on(UsersActions.updateUserSuccess, (state, { user }) => ({ ...state, users: user, loading: false })),
  on(UsersActions.updateUserFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(UsersActions.deleteUser, state => ({ ...state, loading: true })),
  on(UsersActions.deleteUserSuccess, (state, { user }) => ({ ...state, users: user, loading: false })),
  on(UsersActions.deleteUserFailure, (state, { error }) => ({ ...state, error, loading: false })),
);
