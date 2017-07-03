
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/app.state';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public store: Store<AppState>
      ) {
  }
}
