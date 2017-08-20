import * as settings from '../actions/settings';
import { ISettings } from '../models/settings';

export interface State {
  data: ISettings;
}

export const initialState: State = {
  data: null
};

export function reducer(state = initialState, action: settings.Actions): State {

  switch (action.type) {
    case settings.GET_SETTINGS_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
}

export const getData = (state: State) => state.data;
