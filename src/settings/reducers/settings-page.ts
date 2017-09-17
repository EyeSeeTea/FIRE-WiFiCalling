import * as settings from '../actions/settings';

export interface State {
  error: any;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: settings.Actions): State {

  switch (action.type) {

    case settings.UPDATE_SETTINGS: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case settings.UPDATE_SETTINGS_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case settings.UPDATE_SETTINGS_FAILURE: {
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
