import { Action } from '@ngrx/store';
import { AppState } from './app.state';

/** Store types */
export const AppStore = {
  STATUS: 'STATUS',
  AUTHENTICATION: 'AUTHENTICATION',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER'
};

/** Initial state */
const INITIAL_STATE: AppState = {
  status: 'available',
  credit: '0',
  authenticated: false,
  user: undefined,
  settings: undefined,
  notifications: []
};

export function appReducer(state: AppState = INITIAL_STATE, action: Action) {
  switch (action.type) {

    /** Status, payload has the current status, e.g. 'AVAILABLE', 'BUSY' */
    case AppStore.STATUS:
      return Object.assign({}, state, {status: action.payload});

    /** Login, payload has user's credentials */
    case AppStore.LOGIN:
      return Object.assign({}, state);

    /** Logout */
    case AppStore.LOGOUT:
      return Object.assign({}, state);

    /** Authenticated payload has the user object */
    case AppStore.AUTHENTICATION:
      return Object.assign({}, state, action.payload);

    default:
      return Object.assign({}, state);
  }
}

