
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams
      ) {
  }
}
