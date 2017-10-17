import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { ToneService } from '../services/tone.service';
import { DialogService } from '../../shared/dialog/dialog.service';

import * as Session from '../actions/session';

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
    .map(err => {
      this.tone.stopAll();

      if (err) {
        /** Show error dialog */
        this.dialogs.errorDialog(err).present();
      }
    });

  /** Call Hangup */
  @Effect()
  callHangUp$ = this.actions$
    .ofType(Session.HANG_UP)
    .map(() => new Session.Disconnected(null));

  constructor(private actions$: Actions,
              private tone: ToneService,
              private dialogs: DialogService) {
  }

}
