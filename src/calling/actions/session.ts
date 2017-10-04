import { Action } from '@ngrx/store';

/** CALLING TYPES */

export const CONNECTED = '[Calling] Connected';
export const DISCONNECTED = '[Calling] Disconnected';
export const HANG_UP = '[Calling] Hang up';

/** CALLING ACTIONS */

export class Connected implements Action {
  readonly type = CONNECTED;
  constructor(public payload: any) {
  }
}

export class Disconnected implements Action {
  readonly type = DISCONNECTED;

  constructor(public payload: any) {
  }
}

export class HangUp implements Action {
  readonly type = HANG_UP;
}

export type Actions =
  | Connected
  | Disconnected
  | HangUp;
