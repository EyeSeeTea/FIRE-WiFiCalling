import { Action } from '@ngrx/store';
import { User } from '../../auth/models/user';

/** SIP TYPES */

export const INITIALIZE = '[SIP] Initialize';
export const CONNECTING = '[SIP] Connecting';
export const CONNECTED = '[SIP] Connected';
export const DISCONNECTED = '[SIP] Disconnected';
export const REGISTERED = '[SIP] Registered';


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

  constructor(public payload: any) {
  }
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
