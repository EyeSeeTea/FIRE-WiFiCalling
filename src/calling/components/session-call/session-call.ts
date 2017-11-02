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

  mic = true;
  speaker = false;
  /** Display call duration */
  timerTicks$;
  @Input() state: State;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.timerTicks$ = timer(0, 1000);
  }

  hangUp() {
    this.store.dispatch(new Calling.HangUp());
  }

}
