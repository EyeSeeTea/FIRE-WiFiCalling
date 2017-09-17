import * as users from '../actions/users';
import { User } from '../../auth/models/user';

export interface State {
  list: User[];
  error: any;
  pending: boolean;
}

export const initialState: State = {
  list: null,
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: users.Actions): State {

  switch (action.type) {

    case users.GET_LIST: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case users.GET_LIST_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        error: null,
        pending: false,
      };
    }

    case users.GET_LIST_FAILURE: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    }

    case users.SEND_MESSAGE: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case users.SEND_MESSAGE_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case users.SEND_MESSAGE_FAILURE: {
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

export const getUsers = (state: State) => state.list;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
