import { Action } from '@ngrx/store';

/** CALLING TYPES */

export const OUTGOING_CALL = '[Calling] Outgoing Call...';
export const NO_ANSWER = '[Calling] No Answer';

/** OUTGOING CALLS ACTIONS */

export class OutgoingCall implements Action {
  readonly type = OUTGOING_CALL;

  constructor(public payload: any) {
  }
}

export class NoAnswer implements Action {
  readonly type = NO_ANSWER;

  constructor(public payload: any) {
  }
}

export type Actions =
  | OutgoingCall
  | NoAnswer;

