import * as calling from '../actions/outgoing';
import * as session from '../actions/session';
import { User } from '../../auth/models/user';
import { ConnectionType, CallingType } from './session';

export interface State {
  peer: User;
  connection: ConnectionType;
  type: CallingType;
}

export const initialState: State = {
  peer: null,
  connection: null,
  type: null
};

export function reducer(state = initialState, action: calling.Actions | session.Actions): State {

  switch (action.type) {

    case calling.OUTGOING_CALL: {
      return {
        ...state,
        peer: action.payload.peer,
        connection: action.payload.connection,
        type: 'outgoing'
      };
    }

    case session.CONNECTED: {
      return null;
    }

    case calling.NO_ANSWER: {
      return null;
    }

    default: {
      return state;
    }
  }
}

export const getRecipientUser = (state: State) => state.peer;
export const getConnectionType = (state: State) => state.connection;
