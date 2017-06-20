import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public userData: UserData
      ) {
  }
}
