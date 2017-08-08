import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService, AppState } from '../../store';
import { Store } from '@ngrx/store';

import { CallingPage } from './calling';

@Component({
  selector: 'page-call',
  templateUrl: 'call.html',
})
export class CallPage {
  phoneNumber: string = '';

  constructor(public navCtrl: NavController,
              public store: Store<AppState>,
              public appService: AppService) {
  }

  add(n: string) {
    this.phoneNumber += n;
  }

  removeLast() {
    var len = this.phoneNumber.length;
    this.phoneNumber = this.phoneNumber.substring(0, len - 1);
  }

  call() {
    this.navCtrl.push(CallingPage, {'phoneNumber': this.phoneNumber});
  }

  personAdd() {
    console.log('Add contact with number %s', this.phoneNumber);
  }
}
