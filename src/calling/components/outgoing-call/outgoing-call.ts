import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CallState } from '../../reducers/session';
import * as Calling from '../../actions/session';

@Component({
  selector: 'outgoing-call',
  templateUrl: 'outgoing-call.html'
})

export class OutgoingCall implements OnInit {

  @Input() state: CallState;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
  }

  hangUp() {
    this.store.dispatch(new Calling.HangUp());
  }
}
