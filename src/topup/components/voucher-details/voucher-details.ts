import { Component } from '@angular/core';
import { Voucher } from '../../models/voucher';
import { IonicPage, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: 'voucher-details',
  templateUrl: 'voucher-details.html'
})
export class VoucherDetailsPage {

  voucher: Voucher;

  constructor(private params: NavParams) {
    this.voucher = <Voucher>this.params.get('voucher');
  }

}
