import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Store } from "@ngrx/store";

@IonicPage()
@Component({
  selector: 'page-license',
  templateUrl: 'license.html',
})
export class LicensePage {

  constructor(public store: Store<any>, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LicensePage');
  }

}
