import { Action } from '@ngrx/store';
import { CallState } from '../reducers/session';

/** INCOMING CALLS TYPES */

export const INCOMING_CALL = '[Calling] Incoming call';
export const ACCEPT_CALL = '[Calling] Accept incoming call';
export const REJECT_CALL = '[Calling] Reject incoming call';

/** INCOMING CALLS ACTIONS */

export class IncomingCall implements Action {
  readonly type = INCOMING_CALL;

  constructor(public payload: CallState) {
  }
}

export class AcceptCall implements Action {
  readonly type = ACCEPT_CALL;

  constructor(public payload: CallState) {
  }
}

export class RejectCall implements Action {
  readonly type = REJECT_CALL;
}

export type Actions =
  | IncomingCall
  | AcceptCall
  | RejectCall;

