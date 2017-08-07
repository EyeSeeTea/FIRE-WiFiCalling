import { Action } from '@ngrx/store';

/** ADMIN BILLING ACTIONS */

export const GET_PRICING = '[Admin] Get Billing';
export const GET_PRICING_SUCCESS = '[Admin] Get Billing Success';
export const GET_PRICING_FAILURE = '[Admin] Get Billing Failure';
export const UPDATE_PRICING = '[Admin] Update Billing';
export const UPDATE_PRICING_SUCCESS = '[Admin] Update Billing Success';
export const UPDATE_PRICING_FAILURE = '[Admin] Update Billing Failure';


export class GetPricing implements Action {
  readonly type = GET_PRICING;
}

export class GetPricingSuccess implements Action {
  readonly type = GET_PRICING_SUCCESS;

  constructor(public payload: any) {
  }
}

export class GetPricingFailure implements Action {
  readonly type = GET_PRICING_FAILURE;

  constructor(public payload: any) {
  }
}

export class UpdatePricing implements Action {
  readonly type = UPDATE_PRICING;

  constructor(public payload: any) {
  }
}

export class UpdatePricingSuccess implements Action {
  readonly type = UPDATE_PRICING_SUCCESS;
}

export class UpdatePricingFailure implements Action {
  readonly type = UPDATE_PRICING_FAILURE;

  constructor(public payload: any) {
  }
}


export type Actions =
  | GetPricing
  | GetPricingSuccess
  | GetPricingFailure
  | UpdatePricing
  | UpdatePricingSuccess
  | UpdatePricingFailure;
