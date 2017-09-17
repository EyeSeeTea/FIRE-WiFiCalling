import { Action } from '@ngrx/store';
import { User } from '../../auth/models/user';

/** SETTINGS TYPES */

export const UPDATE_SETTINGS = '[Admin] Update Settings';
export const UPDATE_SETTINGS_SUCCESS = '[Admin] Update Settings Success';
export const UPDATE_SETTINGS_FAILURE = '[Admin] Update Settings Failure';

/** SETTINGS ACTIONS */

/** Update billing */

export class UpdateSettings implements Action {
  readonly type = UPDATE_SETTINGS;

  constructor(public payload: User) {
  }
}

export class UpdateSettingsSuccess implements Action {
  readonly type = UPDATE_SETTINGS_SUCCESS;
}

export class UpdateSettingsFailure implements Action {
  readonly type = UPDATE_SETTINGS_FAILURE;

  constructor(public payload: any) {
  }
}

export type Actions =
  | UpdateSettings
  | UpdateSettingsSuccess
  | UpdateSettingsFailure;

