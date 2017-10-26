import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Voucher } from '../models/voucher';
import { AddVoucher } from '../actions/voucher';
import { slideRTLAnimation, slideLTRAnimation} from '../../shared/animations/shared.animations';
import { AuthGuard } from '../../auth/guard/auth-guard';

@IonicPage()
@Component({
  selector: 'page-topup',
  templateUrl: 'topup.html',
  animations: [slideRTLAnimation, slideLTRAnimation]
})

export class TopUpPage extends AuthGuard {

  /** default active tab */
  selectedTab = 'AddVoucher';

  constructor(public store: Store<any>) {
    super(store);
  }

  onAddVoucher(e: Voucher) {
    this.store.dispatch(new AddVoucher(e));
  }

}
