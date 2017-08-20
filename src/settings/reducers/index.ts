import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromSettings from './settings';
import * as fromSettingsPage from './settings-page';

export interface SettingsState {
  data: fromSettings.State;
  settingsPage: fromSettingsPage.State;
}

export interface State extends fromRoot.State {
  settings: SettingsState;
}

export const reducers = {
  data: fromSettings.reducer,
  settingsPage: fromSettingsPage.reducer,
};

export const selectSettingsState = createFeatureSelector<SettingsState>('auth');

export const getSettings = createSelector(selectSettingsState, (state: SettingsState) => state.data);

export const selectSettingsPageState = createSelector(selectSettingsState, (state: SettingsState) => state.settingsPage);

export const getSettingsPageError = createSelector(selectSettingsPageState, fromSettingsPage.getError);

export const getSettingsPagePending = createSelector(selectSettingsPageState, fromSettingsPage.getPending);

