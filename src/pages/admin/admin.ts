import { Component } from '@angular/core';

import { NotificationsPage } from '../notifications/notifications';

@Component({
  templateUrl: 'admin.html'
})
export class AdminPage {
  tab1Root = NotificationsPage;
  tab2Root = NotificationsPage;
  tab3Root = NotificationsPage;
  tab4Root = NotificationsPage;

  constructor() {
  }
}
