import * as calling from '../actions/incoming';
import { CallState } from './session';

export const initialState: CallState = {
  peer: null,
  connection: null,
  type: null
};

export function reducer(state = initialState, action: calling.Actions): CallState {

  switch (action.type) {

    case calling.INCOMING_CALL: {
      return {
        ...state,
        peer: action.payload.peer,
        connection: 'internet',
        type: 'incoming'
      };
    }

    case calling.ACCEPT_CALL:
    case calling.REJECT_CALL: {
      return null;
    }

    default: {
      return state;
    }
  }
}

export const getCaller = (state: CallState) => state.peer;
