import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSessionState, selectOutgoingState, selectIncomingState } from '../reducers';
import { CallingService } from '../services/calling.service';

@Component({
  selector: 'call-worker',
  template: `
    <session-call [state]="sessionState$ | async"></session-call>
    <outgoing-call [state]="outgoingState$ | async"></outgoing-call>
    <incoming-call [state]="incomingState$ | async"></incoming-call>
  `
})

export class CallWorker implements OnInit {

  sessionState$ = this.store.select(selectSessionState);
  incomingState$ = this.store.select(selectIncomingState);
  outgoingState$ = this.store.select(selectOutgoingState);

  constructor(private store: Store<any>, private sip: CallingService) {
  }

  ngOnInit() {
    this.sip.initialize();
  }

}
