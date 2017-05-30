import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../providers/user-data';

@IonicPage()
@Component({
  selector: 'page-topup',
  templateUrl: 'topup.html',
})
export class TopupPage {
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public userData: UserData,
      ) {
  }
}
