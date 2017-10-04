import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers/incoming';
import * as Calling from '../../actions/incoming';

@Component({
  selector: 'incoming-call',
  templateUrl: 'incoming-call.html'
})

export class IncomingCall implements OnInit {

  @Input() state: State;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
  }

  acceptCall() {
    this.store.dispatch(new Calling.AcceptCall(null));
  }

  rejectCall() {
    this.store.dispatch(new Calling.RejectCall(null));
  }
}
