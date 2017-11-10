import { Action } from '@ngrx/store';
import { CallFailureResponse } from "../models/calling.models";

/** INCOMING CALLS TYPES */

export const HANDLE = '[Incoming Call] Handling An Incoming CallS';
export const CALL = '[Incoming Call] Incoming Call';
export const FAILURE = '[Incoming Call] Failure';
export const ACCEPT = '[Incoming Call] Accept';
export const REJECT = '[Incoming Call] Reject';
export const SKIP = '[Incoming Call] Skip';

/** INCOMING CALLS ACTIONS */

export class Handle implements Action {
  readonly type = HANDLE;

  constructor(public payload: any) {
  }
}

export class Call implements Action {
  readonly type = CALL;

  constructor(public payload: any) {
  }
}

export class Failure implements Action {
  readonly type = FAILURE;

  constructor(public payload: CallFailureResponse) {
  }
}

export class Skip implements Action {
  readonly type = SKIP;

  constructor(public payload: any) {
  }
}

export class Accept implements Action {
  readonly type = ACCEPT;
}

export class Reject implements Action {
  readonly type = REJECT;
}


export type Actions =
  | Handle
  | Call
  | Accept
  | Reject
  | Failure
  | Skip;

