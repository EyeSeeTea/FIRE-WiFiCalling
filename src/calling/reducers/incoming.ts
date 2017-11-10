import * as incoming from '../actions/incoming';
import * as session from '../actions/session';
import { CallState } from './session';

export const initialState: CallState = null;

export function reducer(state = initialState, action: incoming.Actions | session.Actions): CallState {

  switch (action.type) {

    case incoming.CALL: {
      /** TODO: Investigate how to show caller id */
      return {
        ...state,
        peer: action.payload,
        connection: 'internet',
        type: 'incoming'
      };
    }

    case incoming.SKIP: {
      return state;
    }

    case incoming.FAILURE:
    case incoming.ACCEPT:
    case incoming.REJECT:
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
