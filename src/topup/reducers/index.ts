import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromVoucher from './voucher';
import * as fromVoucherPage from './voucher-page';

export interface VoucherState {
  data: fromVoucher.State;
  topUpPage: fromVoucherPage.State;
}

export interface State extends fromRoot.State {
  vouchers: VoucherState;
}

export const reducers = {
  data: fromVoucher.reducer,
  topUpPage: fromVoucherPage.reducer,
};

export const selectTopUpState = createFeatureSelector<VoucherState>('vouchers');

export const selectTopUpDataState = createSelector(selectTopUpState, (state: VoucherState) => state.data);
export const selectTopUpPageState = createSelector(selectTopUpState, (state: VoucherState) => state.topUpPage);

export const getVouchers = createSelector(selectTopUpDataState, fromVoucher.getVouchers);
export const selectAuthPageState = createSelector(selectTopUpState, (state: VoucherState) => state.topUpPage);
export const getAuthPageError = createSelector(selectTopUpPageState, fromVoucherPage.getError);
export const getAuthPagePending = createSelector(selectTopUpPageState, fromVoucherPage.getPending);

