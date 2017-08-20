import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<any>
  ) {
  }
}
