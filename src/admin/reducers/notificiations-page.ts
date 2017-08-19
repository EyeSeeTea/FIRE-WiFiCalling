import * as notifications from '../actions/notifications';
import { Notification, Filter, NotificationFilter } from '../models/notification';

export interface State {
  list: Notification[];
  showFilterMenu: boolean;
  filter: Filter;
  order: boolean;
  error: any;
  pending: boolean;
}

export const initialState: State = {
  list: null,
  showFilterMenu: false,
  filter: null,
  order: false,
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: notifications.Actions): State {

  switch (action.type) {

    /** Toggle notification filter menu */
    case notifications.TOGGLE_FILTER_MENU: {
      return {
        ...state,
        showFilterMenu: action.payload
      };
    }

    /** Set notification filter */
    case notifications.SET_FILTER: {
      return {
        ...state,
        filter: action.payload,
        /** Close the menu for filters other than filter by username */
        showFilterMenu:  action.payload && (<Filter>action.payload).name === NotificationFilter.USER_NAME
      };
    }

    /** Set notification date order */
    case notifications.SET_ORDER: {
      return {
        ...state,
        order: action.payload
      };
    }

    /** Get notification */
    case notifications.GET_LIST: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    /** Get notification success */
    case notifications.GET_LIST_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        error: null,
        pending: false,
      };
    }

    /** Get notification failure */
    case notifications.GET_LIST_FAILURE: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    }

    /** Accept user request */
    case notifications.ACCEPT_USER: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    /** Accept user request success */
    case notifications.ACCEPT_USER_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    /** Accept user request failure */
    case notifications.ACCEPT_USER_FAILURE: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    }

    /** Reject user request */
    case notifications.REJECT_USER: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    /** Reject user request success */
    case notifications.REJECT_USER_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    /** Reject user request failure  */
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
export const getShowFilterMenu = (state: State) => state.showFilterMenu;
export const getOrder = (state: State) => state.order;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
