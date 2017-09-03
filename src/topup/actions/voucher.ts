import { Action } from '@ngrx/store';
import { Voucher } from '../models/voucher';

/** VOUCHER TYPES */

export const GET_LIST = '[Voucher] Get Voucher List';
export const GET_LIST_SUCCESS = '[Voucher] Get Voucher List Success';
export const GET_LIST_FAILURE = '[Voucher] Get Voucher List Failure';
export const ADD_VOUCHER = '[Voucher] Add Voucher';
export const ADD_VOUCHER_SUCCESS = '[Voucher] Add Voucher Success';
export const ADD_VOUCHER_FAILURE = '[Voucher] Add Voucher Failure';

/** REGISTER ACTIONS */

export class GetList implements Action {
  readonly type = GET_LIST;
  constructor(public payload: number) {
  }
}

export class GetListSuccess implements Action {
  readonly type = GET_LIST_SUCCESS;
  constructor(public payload: Voucher[]) {
  }
}

export class GetListFailure implements Action {
  readonly type = GET_LIST_FAILURE;
  constructor(public payload: any) {
  }
}

/** VOUCHER ACTIONS */

export class AddVoucher implements Action {
  readonly type = ADD_VOUCHER;
  constructor(public payload: Voucher) {
  }
}

export class AddVoucherSuccess implements Action {
  readonly type = ADD_VOUCHER_SUCCESS;
  constructor(public payload: Voucher) {
  }
}

export class AddVoucherFailure implements Action {
  readonly type = ADD_VOUCHER_FAILURE;
  constructor(public payload: any) {
  }
}

export type Actions =
  | GetList
  | GetListSuccess
  | GetListFailure
  | AddVoucher
  | AddVoucherSuccess
  | AddVoucherFailure;
