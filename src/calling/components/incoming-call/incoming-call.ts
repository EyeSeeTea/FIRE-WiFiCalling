import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CallState } from '../../reducers/session';
import * as Calling from '../../actions/incoming';

@Component({
  selector: 'incoming-call',
  templateUrl: 'incoming-call.html'
})

export class IncomingCall implements OnInit {

  @Input() state: CallState;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
  }

  acceptCall() {
    this.store.dispatch(new Calling.AcceptCall(this.state));
  }

  rejectCall() {
    this.store.dispatch(new Calling.RejectCall());
  }
}
