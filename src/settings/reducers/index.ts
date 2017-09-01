import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromSettingsPage from './settings-page';

export interface SettingsState {
  settingsPage: fromSettingsPage.State;
}

export interface State extends fromRoot.State {
  settings: SettingsState;
}

export const reducers = {
  settingsPage: fromSettingsPage.reducer,
};

export const selectSettingsState = createFeatureSelector<SettingsState>('settings');

export const selectSettingsPageState = createSelector(selectSettingsState, (state: SettingsState) => state.settingsPage);

export const getSettingsPageError = createSelector(selectSettingsPageState, fromSettingsPage.getError);

export const getSettingsPagePending = createSelector(selectSettingsPageState, fromSettingsPage.getPending);

