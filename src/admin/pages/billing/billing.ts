import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Pricing } from '../../models/billing';

import { getBilling, getBillingPending } from '../../reducers';
import * as Billing from '../../actions/billing'

@IonicPage()
@Component({
  selector: 'page-billing',
  templateUrl: 'billing.html'
})
export class BillingPage {

  pricing$ = this.store.select(getBilling);
  pending$ = this.store.select(getBillingPending);

  constructor(public store: Store<any>) {

  }

  ionViewWillEnter() {
    this.store.dispatch(new Billing.GetPricing());
  }

  saveChanges(newPricing: Pricing) {
    this.store.dispatch(new Billing.UpdatePricing(newPricing));
  }
}
