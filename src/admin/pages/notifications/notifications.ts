import { IonicPage } from 'ionic-angular';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAdmin from '../../reducers';
import * as notifications from '../../actions/notifications';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsPage {

  notifications$ = this.store.select(fromAdmin.getNotifications);
  filter$ = this.store.select(fromAdmin.getNotifFilter);

  constructor(public store: Store<any>) {
  }

  ionViewWillEnter() {
    this.store.dispatch(new notifications.GetList(null));
  }
}

