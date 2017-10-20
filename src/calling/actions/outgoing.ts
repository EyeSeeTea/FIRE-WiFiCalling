import { Action } from '@ngrx/store';
import { CallFailureResponse } from "../models/calling.models";

/** CALLING TYPES */

export const CALL = '[Outgoing Call] Make a call';
export const NO_ANSWER = '[Outgoing Call] No answer';
export const FAILURE = '[Outgoing Call] Call failure';
export const CONNECTING = '[Outgoing Call] Connecting';
export const ENDED = '[Outgoing Call] Ended';
export const ACCEPTED = '[Outgoing Call] Accepted';
export const CONFIRMED = '[Outgoing Call] Confirmed';
export const PROGRESS = '[Outgoing Call] Progress';

/** OUTGOING CALLS ACTIONS */

export class Call implements Action {
  readonly type = CALL;

  constructor(public payload: any) {
  }
}

export class Connecting implements Action {
  readonly type = CONNECTING;
}

export class Progress implements Action {
  readonly type = PROGRESS;
}

export class Accepted implements Action {
  readonly type = ACCEPTED;
}

export class Failure implements Action {
  readonly type = FAILURE;

  constructor(public payload: CallFailureResponse) {
  }
}

export class Confirmed implements Action {
  readonly type = CONFIRMED;
}

export class Ended implements Action {
  readonly type = ENDED;

  constructor(public payload: any) {
  }
}

export class NoAnswer implements Action {
  readonly type = NO_ANSWER;

  constructor(public payload: any) {
  }
}

export type Actions =
  | Call
  | Failure
  | NoAnswer
  | Connecting
  | Ended
  | Accepted
  | Confirmed
  | Progress;

