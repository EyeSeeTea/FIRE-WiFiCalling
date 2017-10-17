import { Action } from '@ngrx/store';
import { CallFailureResponse } from "../models/calling.models";

/** INCOMING CALLS TYPES */

export const HANDLE_INCOMING_CALLS = '[Calling] Handle Incoming callS';
export const INCOMING_CALL = '[Calling] Incoming call';
export const CALL_FAILURE = '[Calling] Incoming call failure';
export const ACCEPT_CALL = '[Calling] Accept incoming call';
export const REJECT_CALL = '[Calling] Reject incoming call';
export const SKIP_CALL = '[Calling] Skip incoming call (busy)';

/** INCOMING CALLS ACTIONS */

export class HandleIncomingCalls implements Action {
  readonly type = HANDLE_INCOMING_CALLS;

  constructor(public payload: any) {
  }
}

export class IncomingCall implements Action {
  readonly type = INCOMING_CALL;

  constructor(public payload: any) {
  }
}

export class CallFailure implements Action {
  readonly type = CALL_FAILURE;

  constructor(public payload: CallFailureResponse) {
  }
}

export class SkipCall implements Action {
  readonly type = SKIP_CALL;
}

export class AcceptCall implements Action {
  readonly type = ACCEPT_CALL;
}

export class RejectCall implements Action {
  readonly type = REJECT_CALL;
}


export type Actions =
  | HandleIncomingCalls
  | IncomingCall
  | AcceptCall
  | RejectCall
  | CallFailure
  | SkipCall;

