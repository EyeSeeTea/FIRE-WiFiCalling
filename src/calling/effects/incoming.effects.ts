import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/map';

import * as Session from '../actions/session';
import * as Incoming from '../actions/incoming';
import { CallState } from '../reducers/session';
import { ToneService } from "../../tone/tone.service";

@Injectable()
export class IncomingEffects {

  /** Incoming call, play ringing tone */
  @Effect({dispatch: false})
  incomingCall$ = this.actions$
    .ofType(Incoming.INCOMING_CALL)
    .do(() => this.tone.startRinging());

  /** Accept incoming call */
  @Effect()
  acceptCall$ = this.actions$
    .ofType(Incoming.ACCEPT_CALL)
    .map((action: Incoming.AcceptCall) => action.payload)
    .map((data: CallState) =>  new Session.Connected(data));

  /** Reject incoming call */
  @Effect()
  rejectCall$ = this.actions$
    .ofType(Incoming.REJECT_CALL)
    .map(() =>  new Session.HangUp());


  constructor(private actions$: Actions,
              private tone: ToneService) {
  }

}
