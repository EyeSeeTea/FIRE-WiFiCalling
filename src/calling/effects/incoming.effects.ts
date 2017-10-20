import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import { SipService } from '../services/sip.service';
import audioPlayer from '../services/sounds.service';
import { DialogService } from '../../shared/dialog/dialog.service';

import { CallFailureResponse } from '../models/calling.models';
import { selectIncomingState, selectSessionState } from '../reducers';
import * as Incoming from '../actions/incoming';

@Injectable()
export class IncomingEffects {

  /** Handle Incoming calls */
  @Effect()
  handleIncomingCall$ = this.actions$
    .ofType(Incoming.HANDLE)
    .map((action: Incoming.Handle) => action.payload)
    .withLatestFrom(this.store.select(selectSessionState), this.store.select(selectIncomingState))
    .exhaustMap(([data, session, incoming]) =>
      /** Avoid if busy or other incoming */
      of({}).map((res) => (session || incoming) ? new Incoming.Skip(data) : new Incoming.Call(data))
    );

  /** Incoming call */
  @Effect({dispatch: false})
  incomingCall$ = this.actions$
    .ofType(Incoming.CALL)
    .do(() => audioPlayer.play('ringing', true));

  /** Incoming call failure */
  @Effect({dispatch: false})
  incomingCallFailure$ = this.actions$
    .ofType(Incoming.FAILURE)
    .map((action: Incoming.Failure) => action.payload)
    .do((res: CallFailureResponse) => {
      if (res.cause !== 'Rejected' && res.cause !== 'Canceled') {
        this.dialog.errorDialog(res.message).present();
      }
    });

  /** Accept incoming call */
  @Effect({dispatch: false})
  acceptCall$ = this.actions$
    .ofType(Incoming.ACCEPT)
    .do(() => this.sip.answerIncomingCall());

  /** Reject incoming call */
  @Effect({dispatch: false})
  rejectCall$ = this.actions$
    .ofType(Incoming.REJECT)
    .do(() => this.sip.hangUpIncomingCall());

  /** Skip incoming call */
  @Effect({dispatch: false})
  skipCall$ = this.actions$
    .ofType(Incoming.SKIP)
    .map((action: Incoming.Skip) => action.payload)
    .do((data) => data.session.terminate({status_code: 486, reason_phrase: 'Busy Here'}));


  constructor(private actions$: Actions,
              private store: Store<any>,
              private sip: SipService,
              private dialog: DialogService) {
  }

}
