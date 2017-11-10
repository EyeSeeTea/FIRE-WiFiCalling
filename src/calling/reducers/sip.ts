import * as sip from '../actions/sip';

export type StatusType =
  | null
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'registered';

/** Incoming/outgoing interface */
export interface State {
  status: StatusType;
  error: any;
}

export const initialState: State = {
  status: null,
  error: null
};

export function reducer(state = initialState, action: sip.Actions): State {

  switch (action.type) {

    case sip.CONNECTING: {
      return {
        ...state,
        status: 'connecting'
      };
    }

    case sip.CONNECTED: {
      return {
        ...state,
        status: 'connected'
      };
    }

    case sip.DISCONNECTED: {
      return {
        ...state,
        status: 'disconnected',
        error: action.payload
      };
    }

    case sip.REGISTERED: {
      return {
        ...state,
        status: 'registered'
      };
    }

    default: {
      return state;
    }
  }
}

export const getStatus = (state: State) => state.status;
