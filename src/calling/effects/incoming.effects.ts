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
    .ofType(Incoming.HANDLE_INCOMING_CALLS)
    .map((action: Incoming.HandleIncomingCalls) => action.payload)
    .withLatestFrom(this.store.select(selectSessionState), this.store.select(selectIncomingState))
    .exhaustMap(([data, session, incoming]) => {

      return of({}).map(() => {
        /** Avoid if busy or other incoming */
        if (session || incoming) {
          data.session.terminate({
            status_code: 486,
            reason_phrase: 'Busy Here'
          });
          return new Incoming.SkipCall();
        }
        return new Incoming.IncomingCall(data);
      });
    });

  /** Incoming call */
  @Effect({dispatch: false})
  incomingCall$ = this.actions$
    .ofType(Incoming.INCOMING_CALL)
    .map((action: Incoming.IncomingCall) => action.payload)
    .do((data) => {
      audioPlayer.play('ringing', true);
    });

  /** Incoming call failure */
  @Effect({dispatch: false})
  incomingCallFailure$ = this.actions$
    .ofType(Incoming.CALL_FAILURE)
    .map((action: Incoming.CallFailure) => action.payload)
    .do((res: CallFailureResponse) => {
      if (res.cause !== 'Rejected' && res.cause !== 'Canceled') {
        this.dialog.errorDialog(res.message).present();
      }
    });

  /** Accept incoming call */
  @Effect({dispatch: false})
  acceptCall$ = this.actions$
    .ofType(Incoming.ACCEPT_CALL)
    .do(() => this.sip.answerIncomingCall());

  /** Reject incoming call */
  @Effect({dispatch: false})
  rejectCall$ = this.actions$
    .ofType(Incoming.REJECT_CALL)
    .do(() => this.sip.hangUpIncomingCall());

  constructor(private actions$: Actions,
              private store: Store<any>,
              private sip: SipService,
              private dialog: DialogService) {
  }

}
