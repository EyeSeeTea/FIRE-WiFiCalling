import * as notifications from '../actions/notifications';
import { Notification, Filter } from '../models/notification';

export interface State {
  list: Notification[];
  filter: Filter;
  error: any;
  pending: boolean;
}

export const initialState: State = {
  list: null,
  filter: null,
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: notifications.Actions): State {

  switch (action.type) {

    case notifications.SET_FILTER: {
      return {
        ...state,
        filter: action.payload
      };
    }

    case notifications.GET_LIST: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case notifications.GET_LIST_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        error: null,
        pending: false,
      };
    }

    case notifications.GET_LIST_FAILURE: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    }

    case notifications.ACCEPT_USER: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case notifications.ACCEPT_USER_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case notifications.ACCEPT_USER_FAILURE: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    }

    case notifications.REJECT_USER: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case notifications.REJECT_USER_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case notifications.REJECT_USER_FAILURE: {
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

export const getNotifications = (state: State) => state.list;
export const getFilter = (state: State) => state.filter;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
