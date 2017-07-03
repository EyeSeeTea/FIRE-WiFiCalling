import { AppState } from './../../store';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-topup',
  templateUrl: 'topup.html',
})
export class TopupPage {
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public userData: UserData,
      public store: Store<AppState>
      ) {
  }
}
