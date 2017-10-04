import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs/observable/timer';
import 'rxjs/add/operator/takeWhile'

import { State } from '../../reducers/session';
import * as Calling from '../../actions/session';

@Component({
  selector: 'session-call',
  templateUrl: 'session-call.html'
})

export class SessionCall implements OnInit {

  /** Display call duration */
  timerTicks$;
  @Input() state: State;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.timerTicks$ = timer(0, 1000)
      .takeWhile(() => this.state.status === 'connected');
  }

  testConnected() {
    this.store.dispatch(new Calling.Connected(null));
  }

  hangUp() {
    this.store.dispatch(new Calling.HangUp());
  }

}
