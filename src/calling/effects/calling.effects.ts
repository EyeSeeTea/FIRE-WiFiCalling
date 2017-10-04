import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Loading } from 'ionic-angular';
import { Effect, Actions } from '@ngrx/effects';

import { CallingService } from '../services/calling.service';

import * as Session from '../actions/session';
import * as Outgoing from '../actions/outgoing';
import * as Incoming from '../actions/incoming';

import { User } from '../../auth/models/user';
import { DialogService } from '../../shared/dialog/dialog.service';

@Injectable()
export class CallingEffects {

  @Effect()
  call$ = this.actions$
    .ofType(Outgoing.OUTGOING_CALL)
    .map((action: Outgoing.OutgoingCall) => action.payload)
    .exhaustMap((outgoingData: any) => {

      return this.callingService.call(outgoingData)
        .map(() => new Session.Connected(outgoingData))
        .catch(error => of(new Session.Disconnected(error)));
    });

  /** Call Connected Successfully */

  @Effect({dispatch: false})
  callSuccess$ = this.actions$
    .ofType(Session.CONNECTED)
    .do(() => {
    });

  /** Hangup */
  @Effect()
  callHangUp$ = this.actions$
    .ofType(Session.HANG_UP)
    .map(() => new Session.Disconnected(null));

  /** Update Settings Failure */

  @Effect({dispatch: false})
  callingFailure$ = this.actions$
    .ofType(Session.DISCONNECTED)
    .map((action: Session.Disconnected) => action.payload)
    .filter(err => err)
    .map((err) => {

      /** Close loading dialog */
      if (this.loadingDialog) {
        this.loadingDialog.dismiss();
      }

      /** Show error dialog */
      this.dialogs.errorDialog(err).present();
    });

  loadingDialog: Loading;

  constructor(private actions$: Actions,
              private callingService: CallingService,
              private dialogs: DialogService) {
  }

}
