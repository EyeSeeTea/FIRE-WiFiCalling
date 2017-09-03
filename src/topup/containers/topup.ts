import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Voucher } from '../models/voucher';
import { AddVoucher } from '../actions/voucher';
import { slideRTLAnimation, slideLTRAnimation} from '../../shared/animations/shared.animations';

@IonicPage()
@Component({
  selector: 'page-topup',
  templateUrl: 'topup.html',
  animations: [slideRTLAnimation, slideLTRAnimation]
})

export class TopUpPage {

  /** default active tab */
  selectedTab = 'AddVoucher';

  constructor(private store: Store<any>) {
  }

  onAddVoucher(e: Voucher) {
    this.store.dispatch(new AddVoucher(e));
  }

}
