import { Component } from '@angular/core';

import { HistoryPage } from '../history/history';
import { CallPage } from '../call/call';
import { TopupPage } from '../topup/topup';
import { ContactsPage } from '../contacts/contacts';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabContacts = ContactsPage;
  tabCall = CallPage;
  tabHistory = HistoryPage;
  tabTopup = TopupPage;

  constructor() {
  }

}
