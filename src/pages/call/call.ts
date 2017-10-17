import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { ToneService } from "../../calling/services/tone.service";

@IonicPage()
@Component({
  selector: 'page-call',
  templateUrl: 'call.html',
})
export class CallPage {

  phoneNumber: string = '';

  constructor(public navCtrl: NavController, private toneService: ToneService) {
  }

  add(n: string) {
    this.toneService.start(n);
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

}
