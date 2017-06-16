import { Component } from '@angular/core';

import { NotificationsPage } from '../notifications/notifications';

@Component({
  templateUrl: 'admin.html'
})
export class AdminPage {
  Notifications = NotificationsPage;
  Users = NotificationsPage;
  Billing = NotificationsPage;
  Test = NotificationsPage;

  constructor() {
  }
}
