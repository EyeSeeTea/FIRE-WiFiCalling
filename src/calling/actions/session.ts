import { Action } from '@ngrx/store';
import { CallState } from "../reducers/session";

/** CALLING TYPES */

export const CONNECTED = '[Calling] Connected';
export const DISCONNECTED = '[Calling] Disconnected';
export const HANG_UP = '[Calling] Hang up';
export const CALL_ENDED = '[Calling] Call Ended';

/** CALLING ACTIONS */

export class Connected implements Action {
  readonly type = CONNECTED;

  constructor(public payload: CallState) {
  }
}

export class Disconnected implements Action {
  readonly type = DISCONNECTED;

  constructor(public payload: any) {
  }
}

export class CallEnded implements Action {
  readonly type = CALL_ENDED;
}

export class HangUp implements Action {
  readonly type = HANG_UP;
}

export type Actions =
  | Connected
  | Disconnected
  | HangUp
  | CallEnded;
