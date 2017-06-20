import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Voucher} from '../../../providers/voucher'

@IonicPage()
@Component({
  selector: 'page-voucher-list',
  templateUrl: 'voucherList.html',
  providers: [Voucher]
})
export class VoucherListPage {
  public vouchers: Voucher[];
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      ) {
        //We should have something like this
        // https://angular.io/guide/dependency-injection#!#singleton-services
        //this.vouchers = voucherService.getVouchers();
        this.vouchers = [];
        this.vouchers.push(new Voucher());
        this.vouchers.push(new Voucher());
  }
}