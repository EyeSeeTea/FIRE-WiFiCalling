import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import * as Outgoing from '../actions/outgoing';
import { SipService } from '../services/sip.service';

@Injectable()
export class OutgoingEffects {

  /** Make an outgoing call */
  @Effect({ dispatch: false })
  outgoingCall$ = this.actions$
    .ofType(Outgoing.OUTGOING_CALL)
    .map((action: Outgoing.OutgoingCall) => action.payload)
    .do((phoneNumber: any) => this.sip.call({ phoneNumber}));

  constructor(private actions$: Actions, private sip: SipService) {
  }

}
