import * as calling from '../actions/incoming';
import * as session from '../actions/session';
import { CallState } from './session';

export const initialState: CallState = null;

export function reducer(state = initialState, action: calling.Actions | session.Actions): CallState {

  switch (action.type) {

    case calling.INCOMING_CALL: {
      /** TODO: Investigate how to show caller id */
      return {
        ...state,
        // peer: action.payload,
        connection: 'internet',
        type: 'incoming'
      };
    }

    case calling.SKIP_CALL: {
      return state;
    }

    case calling.CALL_FAILURE:
    case calling.ACCEPT_CALL:
    case calling.REJECT_CALL:
    case session.CONNECTED:
    case session.DISCONNECTED: {
      return null;
    }

    default: {
      return state;
    }
  }
}

export const getCaller = (state: CallState) => state.peer;
