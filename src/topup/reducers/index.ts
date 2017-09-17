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

export const selectAuthStatusState = createSelector(selectTopUpState, (state: VoucherState) => state.data);

export const getVouchers = createSelector(selectAuthStatusState, fromVoucher.getVouchers);

export const selectAuthPageState = createSelector(selectTopUpState, (state: VoucherState) => state.topUpPage);

export const getAuthPageError = createSelector(selectAuthPageState, fromVoucherPage.getError);

export const getAuthPagePending = createSelector(selectAuthPageState, fromVoucherPage.getPending);

