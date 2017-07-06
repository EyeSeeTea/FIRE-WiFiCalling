import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contacts } from '@ionic-native/contacts';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  term;
  searchQuery: string = '';
  list;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public contacts: Contacts,
              public store: Store<AppState>) {
    // contacts.find(['displayName', 'phoneNumbers'], {multiple: true}).then((res) => {
    //   console.log(res);
    //   // this.contactsFound = res;
    // });
    this.initializeItems();
  }

  initializeItems() {

    this.list = [
      {
        displayName: 'Jamee Seals',
        phoneNumber: '111 2222 333 45'
      },
      {
        displayName: 'Coreen Boomer',
        phoneNumber: '111 7777 333 45'
      }, {
        displayName: 'Ruben Gangi',
        phoneNumber: '222 2222 333 45'
      }, {
        displayName: 'Carlos',
        phoneNumber: '111 2222 444 44',
      }, {
        displayName: 'Vasiliki Mccall',
        phoneNumber: '111 2222 444 44'
      }, {
        displayName: 'Donny Flavell',
        phoneNumber: '111 2222 444 44'
      }

    ];
    // ['111 2222 333 45', 'Zeus', '111 7777 333 45', 'Martin', 'Carlos'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

}
