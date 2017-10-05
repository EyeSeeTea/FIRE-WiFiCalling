import * as calling from '../actions/outgoing';
import * as session from '../actions/session';
import { CallState } from './session';

export const initialState: CallState = {
  peer: null,
  connection: null,
  type: null
};

export function reducer(state = initialState, action: calling.Actions | session.Actions): CallState {

  switch (action.type) {

    case calling.OUTGOING_CALL: {
      return {
        ...state,
        peer: action.payload.peer,
        connection: action.payload.connection,
        type: 'outgoing'
      };
    }

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
