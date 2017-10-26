import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { ToneService } from '../services/tone.service';
import { DialogService } from '../../shared/dialog/dialog.service';

import * as Session from '../actions/session';
import { SipService } from '../services/sip.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class SessionEffects {

  /** Call Connected */
  @Effect({dispatch: false})
  callConnected$ = this.actions$
    .ofType(Session.CONNECTED)
    .map(() => this.tone.stopAll());

  /** Call Disconnected */
  @Effect({dispatch: false})
  callDisconnected$ = this.actions$
    .ofType(Session.DISCONNECTED)
    .map((action: Session.Disconnected) => action.payload)
    .do(err => {
      this.tone.stopAll();

      if (err) {
        console.warn(err);
        /** Show error dialog */
        this.dialogs.errorDialog(err).present();
      }
    });

  /** Call Hangup */
  @Effect()
  callHangUp$ = this.actions$
    .ofType(Session.HANG_UP)
    .exhaustMap(() => {
      try {
        this.sip.state.session.terminate();
      } catch (error) {
        console.log('Session already finished');
      }
      this.sip.removeSounds();
      this.sip.clearSessions();
      return of(new Session.Disconnected(null));
    });

  /** Call Ended */
  @Effect({dispatch: false})
  callEnded$ = this.actions$
    .ofType(Session.CALL_ENDED)
    .map((action: Session.CallEnded) => action.payload)
    .do(() => {
      this.tone.stopAll();
      /** Show call summary dialog */
      this.dialogs.callEndDialog(null).present();
    });

  constructor(private actions$: Actions,
              private tone: ToneService,
              private dialogs: DialogService,
              private sip: SipService) {
  }

}
