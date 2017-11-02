import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CallState } from '../../reducers/session';
import * as Calling from '../../actions/session';

@Component({
  selector: 'outgoing-call',
  templateUrl: 'outgoing-call.html'
})

export class OutgoingCall {

  mic = true;
  speaker = false;
  @Input() state: CallState;

  constructor(private store: Store<any>) {
  }

  hangUp() {
    this.store.dispatch(new Calling.HangUp());
  }
}
