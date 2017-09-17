import * as topUp from '../actions/voucher';

export interface State {
  error: any;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: topUp.Actions): State {

  switch (action.type) {

    case topUp.GET_LIST: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case topUp.GET_LIST_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case topUp.GET_LIST_FAILURE: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    }

    case topUp.ADD_VOUCHER: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case topUp.ADD_VOUCHER_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case topUp.ADD_VOUCHER_FAILURE: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
