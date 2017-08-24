import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Http, Headers } from '@angular/http';
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
              public http: Http,
              public store: Store<any>) {
    this.phoneNumber = this.navParams.get('phoneNumber');

    var name = 'joel';
    var pass = 'joel1234';
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(name + ':' + pass));
    var url = `http://dev.eyeseetea.com:5000/callPricing/${this.phoneNumber}`;
    this.http.get(url, {headers: headers}).map(
      res => res.json()).subscribe(data => {
        if (data.status == 'success') {
          this.rates = data.data;
        }
        else {
          console.log('Trouble with the data');
          console.log(data);
        }
    }), (err) => {
        console.log('Authorization failed');
    };
  }

  gsm() {
    console.log('Tried to call %s using GSM', this.phoneNumber);
  }

  voip() {
    console.log('Tried to call %s using VoIP', this.phoneNumber);
  }
}
