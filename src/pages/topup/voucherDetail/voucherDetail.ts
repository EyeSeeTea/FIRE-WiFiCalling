import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Voucher} from '../../../providers/voucher'

@IonicPage({
  segment: 'detail/:id',
  defaultHistory: ['VoucherList']
})
@Component({
  selector: 'page-voucher-detail',
  templateUrl: 'voucherDetail.html',
  providers: [Voucher]
})
export class VoucherDetail {
  public vouchers: Voucher[];
  voucher: Voucher;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      voucher: Voucher,
      ) {

      }
}
