import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectNotificationsState } from '../../reducers';
import * as Notifications from '../../actions/notifications';
import { AdminGuard } from '../../../auth/guard/admin-guard';

@IonicPage()
@Component({
  selector: 'page-notifications',
  template: '<notif-wrapper [state]="state$ | async"></notif-wrapper>'
})
export class NotificationsPage extends AdminGuard {

  state$ = this.store.select(selectNotificationsState);

  constructor(public store: Store<any>) {
    super(store);
  }

  ionViewWillEnter() {
    /** Get notifications list */
    this.store.dispatch(new Notifications.GetList(null));
  }

}

