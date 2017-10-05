import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers'
import * as fromSession from './session';
import * as fromOutgoing from './outgoing';
import * as fromIncoming from './incoming';

export interface CallingState {
  session: fromSession.State;
  outgoing: fromSession.CallState;
  incoming: fromSession.CallState;
}

export const reducers = {
  session: fromSession.reducer,
  outgoing: fromOutgoing.reducer,
  incoming: fromIncoming.reducer,
};

export const selectCallingState = createFeatureSelector<fromRoot.State>('calling');

export const selectSessionState = createSelector(selectCallingState, (state: CallingState) => state.session);
export const selectOutgoingState = createSelector(selectCallingState, (state: CallingState) => state.outgoing);
export const selectIncomingState = createSelector(selectCallingState, (state: CallingState) => state.incoming);
