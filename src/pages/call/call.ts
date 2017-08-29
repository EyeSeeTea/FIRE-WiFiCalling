import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CallingPage } from './calling';

@Component({
  selector: 'page-call',
  templateUrl: 'call.html',
})
export class CallPage {

  phoneNumber: string = '';
  callButtonHidden: boolean = true;

  constructor(public navCtrl: NavController) {
  }

  add(n: string) {
    this.phoneNumber += n;
    this.callButtonHidden = false;
  }

  removeLast() {
    const len = this.phoneNumber.length;
    if (len <= 1)
      this.callButtonHidden = true;
    this.phoneNumber = this.phoneNumber.substring(0, len - 1);
  }

  removeAll() {
    this.phoneNumber = '';
    this.callButtonHidden = true;
  }

  call() {
    this.navCtrl.push(CallingPage, {phoneNumber: this.phoneNumber});
  }
}
