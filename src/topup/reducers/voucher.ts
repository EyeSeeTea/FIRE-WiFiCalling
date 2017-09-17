import * as topUp from '../actions/voucher';
import { Voucher } from '../models/voucher';

export interface State {
  list: Voucher[] | null;
}

export const initialState: State = {
  list: null,
};

export function reducer(state = initialState, action: topUp.Actions): State {

  switch (action.type) {
    case topUp.GET_LIST_SUCCESS: {
      return {
        ...state,
        list: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getVouchers = (state: State) => state.list;
