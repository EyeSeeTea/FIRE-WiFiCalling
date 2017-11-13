import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as router from '../actions/router';

export interface RouterState {
  active: string;
}

export interface State extends fromRoot.State {
  router: RouterState;
}

export function reducers(state = null, action: router.Actions): RouterState {

  switch (action.type) {
    /** Payload here can be the class for the ionic page, not necessarily the name of the page */
    case router.NAVIGATE: {
      return {
        active: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const selectRouterState = createFeatureSelector<RouterState>('router');
export const selectActiveRouteState = createSelector(selectRouterState, (state) => state.active);

