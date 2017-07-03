import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { AppService, AppState } from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'page-call',
  templateUrl: 'call.html',
})
export class CallPage {

  state: AppState;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userData: UserData,
              public store: Store<AppState>,
              public appService: AppService) {
  }

}
