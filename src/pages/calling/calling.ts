import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AlertController } from 'ionic-angular';
import { FireHttp } from '../../auth/http/fire-http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-calling',
  templateUrl: 'calling.html',
})
export class CallingPage {
  phoneNumber: string = '';
  rates = {gsm: 'unknown', voip: 'unknown'};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fireHttp: FireHttp,
              private alertCtrl: AlertController,
              public store: Store<any>) {
    this.phoneNumber = this.navParams.get('phoneNumber');
  }

  ionViewDidLoad() {
    this.fireHttp.get(`/callPricing/${this.phoneNumber}`)
      .map(res => res.json()).subscribe(
      data => {
        if (data.status == 'success') {
          this.rates = data.data;
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Trouble with the data',
            subTitle: 'But the connection to the server worked...',
            buttons: ['Damn']
          });
          alert.present();
          console.log(data);
        }
      },
      err => {
        let alert = this.alertCtrl.create({
          title: 'Authorization Error',
          subTitle: err,
          buttons: ['Damn']
        });
        alert.present();
      });
  }

  gsm() {
    console.log('Tried to call %s using GSM', this.phoneNumber);
  }

  voip() {
    console.log('Tried to call %s using VoIP', this.phoneNumber);
  }
}
