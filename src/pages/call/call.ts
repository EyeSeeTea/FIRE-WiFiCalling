import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../providers/user-data';

@IonicPage()
@Component({
  selector: 'page-call',
  templateUrl: 'call.html',
})
export class CallPage {
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public userData: UserData
      ) {
  }
}
