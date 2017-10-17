import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';

import { SipService } from '../services/sip.service';
import { User } from '../../auth/models/user';
import { getSipStatus } from '../reducers';
import * as Sip from '../actions/sip';

@Injectable()
export class SipEffects {

  /** Initialize SIP when user login */
  @Effect({dispatch: false})
  start$ = this.actions$
    .ofType(Sip.INITIALIZE)
    .map((action: Sip.Initialize) => action.payload)
    .withLatestFrom(this.store.select(getSipStatus))
    .map(([user, state]) => !state ? user : null)
    .filter((user: User) => !!user)
    .do((user: User) => this.sip.initialize(user));

  constructor(private actions$: Actions,
              private store: Store<any>,
              private sip: SipService) {
  }
}
