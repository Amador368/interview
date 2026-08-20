import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducers';

const selectAppFeature = createFeatureSelector<AppState>('app');

export const selectUser = createSelector(
  selectAppFeature,
  (appState) => appState.user
);

export const selectLoading = createSelector(
  selectAppFeature,
  (appState) => appState.loading
);

export const selectError = createSelector(
  selectAppFeature,
  (appState) => appState.error
);
