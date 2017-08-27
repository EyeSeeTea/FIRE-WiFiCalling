import { Refresher } from 'ionic-angular';
import { Component, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '../../../reducers/notificiations-page';
import { GetList } from '../../../actions/notifications';

@Component({
  selector: 'notif-wrapper',
  templateUrl: 'notif-wrapper.component.html'
})
export class NotifWrapperComponent {

  /** A variable to check multiple notifications
   * It is one of the following 'All', 'Unseen', 'None' */
  selectNotif: string;

  /** Notification state */
  state: State;

  @Input('state')
  set setState(state: State) {
    this.state = state;

    /** Close the refresher if pending is false */
    if (!state.pending) {
      this.refresher.complete();
    }
  }

  /** Refresher ref */
  @ViewChild(Refresher) refresher: Refresher;

  constructor(public store: Store<any>) {
  }

  getNotificationsList() {
    this.store.dispatch(new GetList(null));
  }

}

