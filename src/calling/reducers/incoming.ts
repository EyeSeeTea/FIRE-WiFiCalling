import * as calling from '../actions/incoming';
import { User } from '../../auth/models/user';
import { CallingType } from './session';

export interface State {
  peer: User;
  type: CallingType;
}

export const initialState: State = {
  peer: null,
  type: null
};

export function reducer(state = initialState, action: calling.Actions): State {

  switch (action.type) {

    case calling.INCOMING_CALL: {
      return {
        ...state,
        peer: action.payload.peer,
        type: 'incoming'
      };
    }

    case calling.ACCEPT_CALL: {
      return null;
    }
    case calling.REJECT_CALL: {
      return null;
    }

    default: {
      return state;
    }
  }
}

export const getCaller = (state: State) => state.peer;
