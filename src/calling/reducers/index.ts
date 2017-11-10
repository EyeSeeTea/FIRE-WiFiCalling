import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromSip from './sip'
import * as fromSession from './session';
import * as fromOutgoing from './outgoing';
import * as fromIncoming from './incoming';

export interface CallingState {
  sip: fromSip.State;
  session: fromSession.State;
  outgoing: fromSession.CallState;
  incoming: fromSession.CallState;
}

export const reducers = {
  sip: fromSip.reducer,
  session: fromSession.reducer,
  outgoing: fromOutgoing.reducer,
  incoming: fromIncoming.reducer
};

export const selectCallingState = createFeatureSelector<CallingState>('calling');

export const selectSipState = createSelector(selectCallingState, (state: CallingState) => state.sip);
export const selectSessionState = createSelector(selectCallingState, (state: CallingState) => state.session);
export const selectOutgoingState = createSelector(selectCallingState, (state: CallingState) => state.outgoing);
export const selectIncomingState = createSelector(selectCallingState, (state: CallingState) => state.incoming);
export const getSipStatus = createSelector(selectSipState, fromSip.getStatus);
