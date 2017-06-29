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
    isHidden: boolean = true;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public userData: UserData) {
    }

    add(n: string) {
        this.phone_number += n;
        this.isHidden = false;
    }

    remove_last() {
        var len = this.phone_number.length;
        if (len <= 1)
            this.isHidden = true;
        this.phone_number = this.phone_number.substring(0, len - 1);
    }

    remove_all() {
        this.phone_number = '';
        this.isHidden = true;
    }

    call() {
        this.navCtrl.push(CallingPage, {'phone_number': this.phone_number});
    }
}
