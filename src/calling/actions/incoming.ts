import { Action } from '@ngrx/store';

/** INCOMING CALLS TYPES */

export const INCOMING_CALL = '[Calling] Incoming-call call';
export const ACCEPT_CALL = '[Calling] Accept incoming-call call';
export const REJECT_CALL = '[Calling] Reject incoming-call call';

/** INCOMING CALLS ACTIONS */

export class IncomingCall implements Action {
  readonly type = INCOMING_CALL;

  constructor(public payload: any) {
  }
}

export class AcceptCall implements Action {
  readonly type = ACCEPT_CALL;

  constructor(public payload: any) {
  }
}

export class RejectCall implements Action {
  readonly type = REJECT_CALL;

  constructor(public payload: any) {
  }
}

export type Actions =
  | IncomingCall
  | AcceptCall
  | RejectCall;

