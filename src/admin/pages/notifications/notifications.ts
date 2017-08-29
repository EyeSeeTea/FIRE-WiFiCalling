import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectNotificationsState } from '../../reducers';
import * as Notifications from '../../actions/notifications';

@IonicPage()
@Component({
  selector: 'page-notifications',
  template: '<notif-wrapper [state]="state$ | async"></notif-wrapper>'
})
export class NotificationsPage {

  state$ = this.store.select(selectNotificationsState);

  constructor(public store: Store<any>) {
  }

  getNotificationsList() {
    this.store.dispatch(new Notifications.GetList(null));
  }

  ionViewWillEnter() {
    /** Request notification list on page enter */
    this.getNotificationsList();
  }

}

