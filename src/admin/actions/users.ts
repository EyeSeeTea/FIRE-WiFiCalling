import { Action } from '@ngrx/store';

/** ADMIN USERS ACTIONS */

export const GET_LIST = '[Admin] Get Users list';
export const GET_LIST_SUCCESS = '[Admin] Get Users Success';
export const GET_LIST_FAILURE = '[Admin] Get Users Failure';
export const SEND_MESSAGE = '[Admin] Send Message';
export const SEND_MESSAGE_SUCCESS = '[Admin] Send Message Success';
export const SEND_MESSAGE_FAILURE = '[Admin] Send Message Failure';

/** Get users list */

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

/** Send message to (n) users */

export class SendMessage implements Action {
  readonly type = SEND_MESSAGE;
  constructor(public payload: any) {
  }
}

export class SendMessageSuccess implements Action {
  readonly type = SEND_MESSAGE_SUCCESS;
  constructor(public payload: any) {
  }
}

export class SendMessageFailure implements Action {
  readonly type = SEND_MESSAGE_FAILURE;
  constructor(public payload: any) {
  }
}

export type Actions =
  | GetList
  | GetListSuccess
  | GetListFailure
  | SendMessage
  | SendMessageSuccess
  | SendMessageFailure;
