import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-calling',
  templateUrl: 'calling.html',
})
export class CallingPage {
    phoneNumber: string = '';

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public userData: UserData) {
       this.phoneNumber = this.navParams.get('phoneNumber');
    }

    gsm() {
        console.log('Tried to call %s using GSM', this.phoneNumber);
    }

    voip() {
        console.log('Tried to call %s using VoIP', this.phoneNumber);
    }
}
