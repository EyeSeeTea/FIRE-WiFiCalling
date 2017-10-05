import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Loading } from 'ionic-angular';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { DialogService } from '../../shared/dialog/dialog.service';

import * as Session from '../actions/session';
import { ToneService } from "../../tone/tone.service";

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
        /** Close loading dialog */
        if (this.loadingDialog) {
          this.loadingDialog.dismiss();
        }

        /** Show error dialog */
        this.dialogs.errorDialog(err).present();
      }
    });


  /** Call Hangup */
  @Effect()
  callHangUp$ = this.actions$
    .ofType(Session.HANG_UP)
    .map(() => new Session.Disconnected(null));

  loadingDialog: Loading;

  constructor(private actions$: Actions,
              private tone: ToneService,
              private dialogs: DialogService) {
  }

}
