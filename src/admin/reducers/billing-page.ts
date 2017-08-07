import * as billing from '../actions/billing';
import { Pricing } from '../models/billing';

export interface State {
  billing: Pricing;
  error: any;
  pending: boolean;
}

export const initialState: State = {
  billing: null,
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: billing.Actions): State {

  switch (action.type) {

    case billing.GET_PRICING: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case billing.GET_PRICING_SUCCESS: {
      return {
        ...state,
        billing: action.payload,
        error: null,
        pending: false,
      };
    }

    case billing.GET_PRICING_FAILURE: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    }

    case billing.UPDATE_PRICING: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case billing.UPDATE_PRICING_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case billing.UPDATE_PRICING_FAILURE: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    }

    default:
      return state;
  }
}

export const getBilling = (state: State) => state.billing;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
