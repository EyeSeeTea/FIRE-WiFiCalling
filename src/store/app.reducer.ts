import { Action } from '@ngrx/store';
import { AppState } from './app.state';

/** Store types */
export const AppStore = {
    STATUS: 'STATUS',
    LOGIN: 'LOGIN',
    LOGGED_IN: 'LOGGED_IN',
    LOGOUT: 'LOGOUT',
    ERROR: 'ERROR'
};

/** Initial state */
const INITIAL_STATE: AppState = {
    status: 'available',
    credit: '0',
    loggedIn: undefined,
    settings: undefined,
    notifications: []
};

export function appReducer(state: AppState = INITIAL_STATE, action: Action) {
    switch (action.type) {

        case AppStore.STATUS:
            return Object.assign({}, state, { status: action.payload });

        case AppStore.LOGIN:
            return Object.assign({}, state);

        case AppStore.LOGOUT:
            return Object.assign({}, state, { loggedIn: undefined });

        case AppStore.LOGGED_IN:
            return Object.assign({}, state, { loggedIn: action.payload });

        default:
            return Object.assign({}, state);
    }
}
