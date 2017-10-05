import * as calling from '../actions/session';
import { User } from '../../auth/models/user';

export type ConnectionType =
  | 'gsm'
  | 'internet';

export type CallingType =
  | 'incoming'
  | 'outgoing';

export type StatusType =
  | 'ready'
  | 'connecting'
  | 'connected'
  | 'disconnected';

/** Incoming/outgoing interface */
export interface CallState {
  peer: User;
  connection?: ConnectionType;
  type?: CallingType;
}

/** Call session interface */
export interface State extends CallState {
  status: StatusType;
  startDate: number;
  endDate: number;
}

export const initialState: State = {
  peer: null,
  connection: null,
  type: null,
  status: 'ready',
  startDate: null,
  endDate: null
};

export function reducer(state = initialState, action: calling.Actions): State {

  switch (action.type) {

    case calling.CONNECTED: {
      return {
        ...state,
        status: 'connected',
        connection: action.payload.connection,
        type: action.payload.type,
        peer: action.payload.peer,
        startDate: Date.now(),
        endDate: undefined
      };
    }

    case calling.DISCONNECTED: {
      return {
        ...state,
        status: 'disconnected',
        endDate: Date.now()
      };
    }

    default: {
      return state;
    }
  }
}

export const getPeerUser = (state: State) => state.peer;
export const getConnectionType = (state: State) => state.status;
export const getCallingType = (state: State) => state.type;
export const getStatus = (state: State) => state.status;
export const getStartDate = (state: State) => state.status;
export const getEndDate = (state: State) => state.status;
