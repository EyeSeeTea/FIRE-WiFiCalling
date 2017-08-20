import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { CallingPage } from './calling';
import { AuthGuard } from "../../auth/guard/auth-guard";

@Component({
  selector: 'page-call',
  templateUrl: 'call.html',
})
export class CallPage extends AuthGuard {

  phoneNumber: string = '';
  callButtonHidden: boolean = true;

  constructor(public navCtrl: NavController, public store: Store<any>) {
    super(store);
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
