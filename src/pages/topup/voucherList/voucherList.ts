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
        // TODO: use getVouchersFromServer instead of getVouchersFromMock
        // https://angular.io/guide/dependency-injection#!#singleton-services
        this.vouchers = voucherService.getVouchersFromMock();
        voucherService.getVouchersFromServer();
  }

  pushPage(voucher) {
    console.log('Navigate to detail of voucher: ' + voucher.id);
    this.navCtrl.push('VoucherDetail', {
      'id': voucher.id
    });
  }
}
