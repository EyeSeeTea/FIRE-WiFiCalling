import * as calling from '../actions/outgoing';
import * as session from '../actions/session';
import { CallState } from './session';

export const initialState: CallState = null;

export function reducer(state = initialState, action: calling.Actions | session.Actions): CallState {

  switch (action.type) {

    case calling.CALL: {
      return {
        ...state,
        peer: action.payload.peer,
        connection: action.payload.connection,
        type: 'outgoing'
      };
    }

    case calling.CONNECTING: {
      return {
        ...state,
        status: 'connecting'
      };
    }

    case calling.PROGRESS: {
      return {
        ...state,
        status: 'ringing'
      };
    }

    case calling.FAILURE:
    case calling.CONFIRMED:
    case session.CONNECTED:
    case session.DISCONNECTED: {
      return null;
    }

    default: {
      return state;
    }
  }
}

export const getRecipientUser = (state: CallState) => state.peer;
