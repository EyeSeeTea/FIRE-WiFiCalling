import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '../../reducers/outgoing';
import * as Calling from '../../actions/session';

@Component({
  selector: 'outgoing-call',
  templateUrl: 'outgoing-call.html'
})

export class OutgoingCall implements OnInit {

  @Input() state: State;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('outgoing test', this.state);
  }

  testConnected() {
    this.store.dispatch(new Calling.Connected(null));
  }

  hangUp() {
    this.store.dispatch(new Calling.HangUp());
  }

}
