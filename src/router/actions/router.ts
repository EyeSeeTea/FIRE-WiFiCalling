import { Action } from '@ngrx/store';

/** ROUTER TYPES */

export const NAVIGATE = '[ROUTER] Update Settings';

/** ROUTER ACTIONS */

export class Navigate implements Action {
  readonly type = NAVIGATE;

  constructor(public payload: string) {
  }
}

export type Actions =
  | Navigate;

