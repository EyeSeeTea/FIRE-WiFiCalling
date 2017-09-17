import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromAuth from './auth';
import * as fromAuthPage from './auth-page';

export interface AuthState {
  status: fromAuth.State;
  authPage: fromAuthPage.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers = {
  status: fromAuth.reducer,
  authPage: fromAuthPage.reducer,
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatusState = createSelector(selectAuthState, (state: AuthState) => state.status);

export const getLoggedIn = createSelector(selectAuthStatusState, fromAuth.getLoggedIn);

export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);

export const selectAuthPageState = createSelector(selectAuthState, (state: AuthState) => state.authPage);

export const getAuthPageError = createSelector(selectAuthPageState, fromAuthPage.getError);

export const getAuthPagePending = createSelector(selectAuthPageState, fromAuthPage.getPending);

