import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppService, AppState } from '../../store';
import { Store } from '@ngrx/store';

import { CallingPage } from './calling';

@Component({
  selector: 'page-call',
  templateUrl: 'call.html',
})
export class CallPage {
    phoneNumber: string = '';
    callButtonHidden: boolean = true;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public store: Store<AppState>,
                public appService: AppService) {
    }

    add(n: string) {
        this.phoneNumber += n;
        this.callButtonHidden = false;
    }

    removeLast() {
        var len = this.phoneNumber.length;
        if (len <= 1)
            this.callButtonHidden = true;
        this.phoneNumber = this.phoneNumber.substring(0, len - 1);
    }

    removeAll() {
        this.phoneNumber = '';
        this.callButtonHidden = true;
    }

    call() {
        this.navCtrl.push(CallingPage, {'phoneNumber': this.phoneNumber});
    }
}
