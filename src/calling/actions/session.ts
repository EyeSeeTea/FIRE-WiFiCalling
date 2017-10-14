import { Action } from '@ngrx/store';

/** CALLING TYPES */

export const INITIALIZE = '[Calling] Initialize SIP';
export const CONNECTED = '[Calling] Connected';
export const DISCONNECTED = '[Calling] Disconnected';
export const HANG_UP = '[Calling] Hang up';

/** CALLING ACTIONS */

export class Initialize implements Action {
  readonly type = INITIALIZE;

  constructor(public payload: any) {
  }
}

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
  | Initialize
  | Connected
  | Disconnected
  | HangUp;
