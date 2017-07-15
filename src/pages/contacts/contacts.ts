import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contacts, IContactProperties } from '@ionic-native/contacts';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  term;
  searchQuery: string = '';
  list: IContactProperties[];
  mockList;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public contacts: Contacts,
              public store: Store<AppState>) {
    contacts.find(['displayName', 'phoneNumbers'], {multiple: true}).then((res) => {
      console.log(res);
      this.list = res;
      // this.contactsFound = res;
    }).catch(err => {
      this.list = this.mockList;
    });
    this.initializeItems();
  }

  initializeItems() {

    this.mockList = [
      {
        displayName: 'Jamee Seals',
        phoneNumber: ['[111 2222 333 45']
      },
      {
        displayName: 'Coreen Boomer',
        phoneNumber: ['111 7777 333 45']
      }, {
        displayName: 'Ruben Gangi',
        phoneNumber: ['222 2222 333 45']
      }, {
        displayName: 'Carlos',
        phoneNumber: ['111 2222 444 44'],
      }, {
        displayName: 'Vasiliki Mccall',
        phoneNumber: ['111 2222 444 44']
      }, {
        displayName: 'Donny Flavell',
        phoneNumber: ['111 2222 444 44']
      }

    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

}
