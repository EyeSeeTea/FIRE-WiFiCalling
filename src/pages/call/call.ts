import { AppStore } from './../../store/app.reducer';
import { AppState } from './../../store/app.state';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Store } from '@ngrx/store';

@Component({
  selector: 'page-call',
  templateUrl: 'call.html',
})
export class CallPage {

  state: AppState;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: UserData,
    public store: Store<AppState>
  ) {
  }

  login() {
    this.store.dispatch({ type: AppStore.LOGIN });
  }

  logout() {
    this.store.dispatch({ type: AppStore.LOGOUT });
  }

  test() {
    this.store.dispatch({ type: AppStore.STATUS, payload: 'Busy' });
  }
}
