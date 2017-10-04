import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { Store } from "@ngrx/store";

import * as outgoingCall from '../../calling/actions/outgoing';
import * as incomingCall from '../../calling/actions/incoming';

@IonicPage()
@Component({
  selector: 'page-call',
  templateUrl: 'call.html',
})
export class CallPage {

  phoneNumber: string = '';

  constructor(public navCtrl: NavController, private store: Store<any>) {
  }

  add(n: string) {
    this.phoneNumber += n;
  }

  removeLast() {
    const len = this.phoneNumber.length;
    this.phoneNumber = this.phoneNumber.substring(0, len - 1);
  }

  call() {
    this.navCtrl.push('CallTypePage', {'phoneNumber': this.phoneNumber});
  }

  personAdd() {
    console.log('Add contact with number %s', this.phoneNumber);
  }

  incomingTest(){
    this.store.dispatch(new incomingCall.IncomingCall({
      peer: {
        name: 'Maria',
        phoneNumber: '+966523118088'
      },
    }));
  }

  outgoingTest() {
    this.store.dispatch(new outgoingCall.OutgoingCall({
      peer: {
        name: 'John',
        phoneNumber: '+963113118088'
      },
      connection: 'internet'
    }));
  }
}
