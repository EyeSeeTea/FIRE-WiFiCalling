import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../providers/user-data';

import { CallingPage } from './calling';

@Component({
  selector: 'page-call',
  templateUrl: 'call.html',
})
export class CallPage {
    public pushPage: any = CallingPage;
    phone_number: string = '';

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public userData: UserData) {
    }

    add(n: string) {
        this.phone_number += n;
    }

    remove_last() {
        if (this.phone_number.length > 0)
            this.phone_number = this.phone_number.substring(0, -1);
    }
}
