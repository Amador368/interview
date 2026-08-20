import { createReducer, on } from '@ngrx/store';
import { User } from '../users/models/user.model';
import * as AppActions from './app.actions';

export interface AppState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AppState = {
  user: null,
  loading: false,
  error: null,
};

export const appReducer = createReducer(
  initialState,

  on(AppActions.getUser, state => ({ ...state, loading: true, error: null })),
  on(AppActions.getUserSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(AppActions.getUserFailure, (state, { error }) => ({ ...state, error, loading: false }))
);