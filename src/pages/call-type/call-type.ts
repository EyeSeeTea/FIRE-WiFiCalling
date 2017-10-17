import { Component } from '@angular/core';
import { App, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { FireHttp } from '../../auth/http/fire-http';
import 'rxjs/add/operator/map';
import * as Calling from '../../calling/actions/outgoing';

@IonicPage({
  segment: 'call-type'
})
@Component({
  selector: 'page-call-type',
  templateUrl: 'call-type.html',
})
export class CallTypePage {

  phoneNumber: string = '';
  rates = {gsm: 'unknown', voip: 'unknown'};

  constructor(public app: App,
              public navParams: NavParams,
              private fireHttp: FireHttp,
              public store: Store<any>) {
    this.phoneNumber = this.navParams.get('phoneNumber');
  }

  ionViewDidLoad() {
    this.fireHttp.get(`/callPricing/${this.phoneNumber}`)
      .map(res => res.data)
      .subscribe(data => this.rates = data);
  }

  gsm() {
    this.store.dispatch(new Calling.OutgoingCall(this.phoneNumber));
  }

  voip() {
    this.store.dispatch(new Calling.OutgoingCall(this.phoneNumber));
  }
}
