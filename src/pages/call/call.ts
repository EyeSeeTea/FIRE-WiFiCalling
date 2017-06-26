import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../providers/user-data';

import { CallingPage } from './calling';

@Component({
  selector: 'page-call',
  templateUrl: 'call.html',
})
export class CallPage {
    phone_number: string = '';

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public userData: UserData) {
    }

    add(n: string) {
        this.phone_number += n;
    }

    remove_last() {
        var len = this.phone_number.length;
        if (len > 0)
            this.phone_number = this.phone_number.substring(0, len-1);
    }

    call() {
        this.navCtrl.push(CallingPage, {'phone_number': this.phone_number});
    }
}
