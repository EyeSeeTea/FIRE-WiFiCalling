import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../providers/user-data';

import { VoucherList } from './voucherList/voucherList';
import { AddVoucherPage } from './addVoucher/addVoucher';

@Component({
  selector: 'page-topup',
  templateUrl: 'topup.html',
})
export class TopupPage {
  addVoucher = AddVoucherPage;
  voucherList = VoucherList;



  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public userData: UserData,
      ) {
  }
}
