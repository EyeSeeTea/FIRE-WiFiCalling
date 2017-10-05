import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';

import { CallingService } from '../services/calling.service';
import { ToneService } from '../../tone/tone.service';

import * as Session from '../actions/session';
import * as Outgoing from '../actions/outgoing';
import { CallState } from '../reducers/session';

@Injectable()
export class OutgoingEffects {

  /** Make an outgoing call */
  @Effect()
  outgoingCall$ = this.actions$
    .ofType(Outgoing.OUTGOING_CALL)
    .map((action: Outgoing.OutgoingCall) => action.payload)
    .exhaustMap((data: CallState) => {

      this.tone.startRinging();

      return this.sip.call(data)
        .map(() => new Session.Connected(data))
        .catch(error => of(new Session.Disconnected(error)));
    });

  constructor(private actions$: Actions,
              private sip: CallingService,
              private tone: ToneService) {
  }

}
