import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSessionState, selectOutgoingState, selectIncomingState, getSipStatus } from '../reducers';

@Component({
  selector: 'call-worker',
  template: `
    <!--<sip-status [state]="sipStatus$ | async"></sip-status>-->
    <session-call [state]="sessionState$ | async"></session-call>
    <outgoing-call [state]="outgoingState$ | async"></outgoing-call>
    <incoming-call [state]="incomingState$ | async"></incoming-call>
  `
})

export class CallWorker {

  sipStatus$ = this.store.select(getSipStatus);
  sessionState$ = this.store.select(selectSessionState);
  incomingState$ = this.store.select(selectIncomingState);
  outgoingState$ = this.store.select(selectOutgoingState);

  constructor(private store: Store<any>) {
  }

}
