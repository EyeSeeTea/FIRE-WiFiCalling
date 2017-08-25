import { Component } from '@angular/core';

import { HistoryPage } from '../history/history';
import { TopupPage } from '../topup/topup';
import { ContactsPage } from '../contacts/contacts';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabContacts = ContactsPage;
  tabCall = 'CallPage';
  tabHistory = HistoryPage;
  tabTopup = TopupPage;

  constructor() {
  }

}
