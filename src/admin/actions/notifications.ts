import { Action } from '@ngrx/store';

/** ADMIN NOTIFICATIONS ACTIONS */

export const ACCEPT_USER = '[Admin] Accept User';
export const ACCEPT_USER_SUCCESS = '[Admin] Accept User Success';
export const ACCEPT_USER_FAILURE = '[Admin] Accept User Failure';
export const REJECT_USER = '[Admin] Reject User';
export const REJECT_USER_SUCCESS = '[Admin] Reject User Success';
export const REJECT_USER_FAILURE = '[Admin] Reject User Failure';
export const GET_LIST = '[Admin] Get Notifications';
export const GET_LIST_SUCCESS = '[Admin] Get Notifications Success';
export const GET_LIST_FAILURE = '[Admin] Get Notifications Failure';
export const SET_FILTER = '[Admin] Set Notifications Filter';
export const MARK_SEEN = '[Admin] Mark Notifications As Read';
export const MARK_SEEN_SUCCESS = '[Admin] Mark Notifications As Read Success';
export const MARK_SEEN_FAILURE = '[Admin] Mark Notifications As Read Failure';

export class SetFilter implements Action {
  readonly type = SET_FILTER;

  constructor(public payload: any) {
  }
}

export class GetList implements Action {
  readonly type = GET_LIST;

  constructor(public payload: any) {
  }
}

export class GetListSuccess implements Action {
  readonly type = GET_LIST_SUCCESS;

  constructor(public payload: any) {
  }
}

export class GetListFailure implements Action {
  readonly type = GET_LIST_FAILURE;

  constructor(public payload: any) {
  }
}

export class AcceptUser implements Action {
  readonly type = ACCEPT_USER;

  constructor(public payload: number) {
  }
}

export class AcceptUserSuccess implements Action {
  readonly type = ACCEPT_USER_SUCCESS;
}

export class AcceptUserFailure implements Action {
  readonly type = ACCEPT_USER_FAILURE;

  constructor(public payload: any) {
  }
}

export class RejectUser implements Action {
  readonly type = REJECT_USER;

  constructor(public payload: number) {
  }
}

export class RejectUserSuccess implements Action {
  readonly type = REJECT_USER_SUCCESS;
}

export class RejectUserFailure implements Action {
  readonly type = REJECT_USER_FAILURE;

  constructor(public payload: any) {
  }
}

export class MarkSeen implements Action {
  readonly type = MARK_SEEN;

  constructor(public payload: any) {
  }
}

export class MarkSeenSuccess implements Action {
  readonly type = MARK_SEEN_SUCCESS;
}

export class MarkSeenFailure implements Action {
  readonly type = MARK_SEEN_FAILURE;

  constructor(public payload: any) {
  }
}


export type Actions =
  | SetFilter
  | GetList
  | GetListSuccess
  | GetListFailure
  | AcceptUser
  | AcceptUserSuccess
  | AcceptUserFailure
  | RejectUser
  | RejectUserSuccess
  | RejectUserFailure
  | MarkSeen
  | MarkSeenSuccess
  | MarkSeenFailure;
