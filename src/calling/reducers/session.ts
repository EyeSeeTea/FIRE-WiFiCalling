import * as calling from '../actions/session';
import { User } from '../../auth/models/user';

export type ConnectionType =
  | 'gsm'
  | 'internet';

export type CallingType =
  | 'incoming'
  | 'outgoing';

/** Incoming/outgoing interface */
export interface CallState {
  peer: User;
  connection?: ConnectionType;
  type?: CallingType;
  status?: string;
}

/** Call session interface */
export interface State extends CallState {
  startDate: number;
  endDate: number;
}

export const initialState: State = null;

export function reducer(state = initialState, action: calling.Actions): State {

  switch (action.type) {

    case calling.CONNECTED: {
      return {
        ...state,
        connection: action.payload.connection,
        type: action.payload.type,
        peer: action.payload.peer,
        startDate: Date.now(),
        endDate: undefined
      };
    }

    // case calling.DISCONNECTED: {
    //   return {
    //     ...state,
    //     endDate: Date.now()
    //   };
    // }

    case calling.CALL_ENDED:
    case calling.DISCONNECTED: {
      return null
    }

    default: {
      return state;
    }
  }
}

export const getPeerUser = (state: State) => state.peer;
export const getCallingType = (state: State) => state.type;
export const getConnectionType = (state: State) => state.connection;
export const getStartDate = (state: State) => state.startDate;
export const getEndDate = (state: State) => state.endDate;
