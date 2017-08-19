import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Pricing } from '../../models/billing';

import * as fromAdmin from '../../reducers';
import * as billing from '../../actions/billing'

@IonicPage()
@Component({
  selector: 'page-billing',
  templateUrl: 'billing.html'
})
export class BillingPage {

  pricing$ = this.store.select(fromAdmin.getBilling);
  pending$ = this.store.select(fromAdmin.getBillingPending);

  constructor(public store: Store<any>) {

  }

  ionViewWillEnter() {
    this.store.dispatch(new billing.GetPricing());
  }

  saveChanges(newPricing: Pricing) {
    this.store.dispatch(new billing.UpdatePricing(newPricing));
  }
}
