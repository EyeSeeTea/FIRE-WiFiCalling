import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSessionState, selectOutgoingState, selectIncomingState } from '../reducers';

@Component({
  selector: 'call-worker',
  template: `
    <session-call [state]="sessionState$ | async"></session-call>
    <outgoing-call [state]="outgoingState$ | async"></outgoing-call>
    <incoming-call [state]="incomingState$ | async"></incoming-call>
  `
})

export class CallWorker {

  sessionState$ = this.store.select(selectSessionState);
  incomingState$ = this.store.select(selectIncomingState);
  outgoingState$ = this.store.select(selectOutgoingState);

  constructor(private store: Store<any>) {
  }

}
