import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Voucher } from '../../../providers/voucher';
import { VoucherService } from '../../../providers/voucher.service'

@IonicPage()
@Component({
  selector: 'page-voucher-list',
  templateUrl: 'voucherList.html',
  providers: [Voucher, VoucherService]
})
export class VoucherList {
  vouchers: Voucher[];  
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      voucherService: VoucherService
      ) {
        //We should have something like this
        // https://angular.io/guide/dependency-injection#!#singleton-services
        //this.vouchers = voucherService.getVouchers();
        this.vouchers = voucherService.getVouchers();
  }

  pushPage(voucher) {
    console.log('Navigate to detail of voucher: ' + voucher.id);
    this.navCtrl.push('VoucherDetail', {
      'id': voucher.id
    });
  }
}
