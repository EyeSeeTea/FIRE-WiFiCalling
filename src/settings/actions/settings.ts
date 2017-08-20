import { Action } from '@ngrx/store';

/** SETTINGS TYPES */

export const GET_SETTINGS = '[Admin] Get Settings';
export const GET_SETTINGS_SUCCESS = '[Admin] Get Settings Success';
export const GET_SETTINGS_FAILURE = '[Admin] Get Settings Failure';
export const UPDATE_SETTINGS = '[Admin] Update Settings';
export const UPDATE_SETTINGS_SUCCESS = '[Admin] Update Settings Success';
export const UPDATE_SETTINGS_FAILURE = '[Admin] Update Settings Failure';

/** SETTINGS ACTIONS */

export class GetSettings implements Action {
  readonly type = GET_SETTINGS;
}

export class GetSettingsSuccess implements Action {
  readonly type = GET_SETTINGS_SUCCESS;

  constructor(public payload: any) {
  }
}

export class GetSettingsFailure implements Action {
  readonly type = GET_SETTINGS_FAILURE;

  constructor(public payload: any) {
  }
}

/** Update billing */

export class UpdateSettings implements Action {
  readonly type = UPDATE_SETTINGS;

  constructor(public payload: any) {
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
  | GetSettings
  | GetSettingsSuccess
  | GetSettingsFailure
  | UpdateSettings
  | UpdateSettingsSuccess
  | UpdateSettingsFailure;

