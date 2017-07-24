import * as auth from '../actions/auth';

export interface State {
  error: any;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: auth.Actions): State {

  switch (action.type) {

    case auth.LOGIN: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case auth.LOGIN_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case auth.LOGIN_FAILURE: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    }

    case auth.REGISTER: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case auth.REGISTER_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case auth.REGISTER_FAILURE: {
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
