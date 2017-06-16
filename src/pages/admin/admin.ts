import { Component } from '@angular/core';

import { NotificationsPage } from '../notifications/notifications';

@Component({
  templateUrl: 'admin.html'
})
export class AdminPage {
  tabNotifications = NotificationsPage;
  tabUsers = NotificationsPage;
  tabBilling = NotificationsPage;
  tabTest = NotificationsPage;

  constructor() {
  }
}
