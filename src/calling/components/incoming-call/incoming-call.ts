import { Component, Input } from '@angular/core';
import { CallState } from '../../reducers/session';
import * as Incoming from '../../actions/incoming';
import { Store } from "@ngrx/store";

@Component({
  selector: 'incoming-call',
  templateUrl: 'incoming-call.html'
})

export class IncomingCall {

  @Input() state: CallState;

  constructor(public store: Store<any>) {
  }

  answer() {
    this.store.dispatch(new Incoming.Accept())
  }

  hangUp() {
    this.store.dispatch(new Incoming.Reject())
  }
}
