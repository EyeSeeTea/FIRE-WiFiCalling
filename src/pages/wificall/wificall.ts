import { Component } from '@angular/core';

import { ContactsPage } from '../contacts/contacts';
import { HistoryPage } from '../history/history';
import { CallPage } from '../call/call';
import { TopupPage } from '../topup/topup';

@Component({
  templateUrl: 'wificall.html'
})
export class WiFiCallPage {
  Call = CallPage;
  Contacts = ContactsPage;
  History = HistoryPage;
  Topup = TopupPage;

  constructor() {
  }
}
