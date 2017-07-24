import { ActionReducerMap, ActionReducer } from '@ngrx/store';

export interface State {
}

export const reducers: ActionReducerMap<State> = {
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<any, any> {
  return function (state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: ActionReducer<any, any>[] = [logger];

