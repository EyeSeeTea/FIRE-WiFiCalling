import { Component } from '@angular/core';

import { ContactsPage } from '../contacts/contacts';
import { HistoryPage } from '../history/history';
import { CallPage } from '../call/call';
import { TopupPage } from '../topup/topup';

@Component({
  templateUrl: 'wificall.html'
})
export class WificallPage {
  tab1Root = CallPage;
  tab2Root = ContactsPage;
  tab3Root = HistoryPage;
  tab4Root = TopupPage;

  constructor() {
  }
}
