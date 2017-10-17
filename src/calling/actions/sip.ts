import { Action } from '@ngrx/store';
import { User } from '../../auth/models/user';

/** SIP TYPES */

export const INITIALIZE = '[Calling] SIP Initialize';
export const CONNECTING = '[Calling] SIP Connecting';
export const CONNECTED = '[Calling] SIP Connected';
export const DISCONNECTED = '[Calling] SIP Disconnected';
export const REGISTERED = '[Calling] SIP Registered';


/** SIP ACTIONS */

export class Initialize implements Action {
  readonly type = INITIALIZE;

  constructor(public payload: User) {
  }
}

export class Connecting implements Action {
  readonly type = CONNECTING;
}

export class Connected implements Action {
  readonly type = CONNECTED;
}

export class Disconnected implements Action {
  readonly type = DISCONNECTED;

  constructor(public payload: any) {
  }
}

export class Registered implements Action {
  readonly type = REGISTERED;
}

export type Actions =
  | Initialize
  | Connecting
  | Connected
  | Disconnected
  | Registered;
