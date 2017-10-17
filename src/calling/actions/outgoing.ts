import { Action } from '@ngrx/store';
import { CallFailureResponse } from "../models/calling.models";

/** CALLING TYPES */

export const OUTGOING_CALL = '[Calling] Make An Outgoing Call';
export const NO_ANSWER = '[Calling] No Answer';
export const CALL_FAILURE = '[Calling] Incoming call failure';

/** OUTGOING CALLS ACTIONS */

export class OutgoingCall implements Action {
  readonly type = OUTGOING_CALL;

  constructor(public payload: any) {
  }
}

export class CallFailure implements Action {
  readonly type = CALL_FAILURE;

  constructor(public payload: CallFailureResponse) {
  }
}

export class NoAnswer implements Action {
  readonly type = NO_ANSWER;

  constructor(public payload: any) {
  }
}

export type Actions =
  | OutgoingCall
  | CallFailure
  | NoAnswer;

