import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { NotificationsPage } from '../notifications/notifications';
import { AuthGuard } from '../../auth/guard/auth-guard';

@Component({
  templateUrl: 'admin.html'
})
export class AdminPage extends AuthGuard {

  tabNotifications = NotificationsPage;
  tabUsers = NotificationsPage;
  tabBilling = NotificationsPage;
  tabTest = NotificationsPage;

  constructor(public store: Store<any>) {
    super(store);
  }

}
