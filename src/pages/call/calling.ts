import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

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
              public store: Store<AppState>) {
    this.phoneNumber = this.navParams.get('phoneNumber');

    var name = 'joel';
    var pass = 'joel1234';
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(name + ':' + pass));
    var url = `http://dev.eyeseetea.com:5000/callPricing/${this.phoneNumber}`;
    console.log(url);
    this.http.get(url, {headers: headers}).map(
      res => res.json()).subscribe(data => {
        if (data.status == 'success') {
          this.rates = data.data;
        }
        else {
          console.log('meh');
          console.log(data);
        }
    });
  }

  gsm() {
    console.log('Tried to call %s using GSM', this.phoneNumber);
  }

  voip() {
    console.log('Tried to call %s using VoIP', this.phoneNumber);
  }
}
