import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { LoadingController, ModalController } from 'ionic-angular';
import { Effect, Actions } from '@ngrx/effects';

import { BillingService } from '../services/billing.service';
import * as Billing from '../actions/billing';

import { Pricing } from '../models/billing';
import { DialogComponent } from '../../shared/dialog/dialog';

@Injectable()
export class BillingEffects {

  /** Get Billing */

  @Effect()
  getBilling$ = this.actions$
    .ofType(Billing.GET_PRICING)
    .exhaustMap(() =>
      this.billingService.getPricing()
        .map((pricing: Pricing) => new Billing.GetPricingSuccess(pricing))
        .catch(error => of(new Billing.GetPricingFailure(error)))
    );

  /** Get Billing Fail */

  @Effect({dispatch: false})
  getBillingFailure$ = this.actions$
    .ofType(Billing.GET_PRICING_FAILURE)
    .map((action: Billing.GetPricingFailure) => action.payload)
    .map((err) => {

      this.modalCtrl.create(DialogComponent,
        {
          title: 'Error',
          content: err,
          buttons: [
            {label: 'Ok', color: 'link'}
          ]
        }).present();
    });

  /** Update Billing */

  @Effect()
  updateBilling$ = this.actions$
    .ofType(Billing.UPDATE_PRICING)
    .map((action: Billing.UpdatePricing) => action.payload)
    .exhaustMap((pricing) => {

      /** Show loading dialog */
      this.loadingDialog = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loadingDialog.present();

      return this.billingService.updatePricing(pricing)
        .map(() => new Billing.UpdatePricingSuccess())
        .catch(error => of(new Billing.UpdatePricingFailure(error)))
    });

  /** Update Billing Success */

  @Effect({dispatch: false})
  updateBillingSuccess$ = this.actions$
    .ofType(Billing.UPDATE_PRICING_SUCCESS)
    .do(() => {
      /** Close loading dialog */
      this.loadingDialog.dismiss();

      this.modalCtrl.create(DialogComponent,
        {
          title: 'Success',
          content: 'Pricing updated successfully.',
          buttons: [
            {label: 'Ok', color: 'link'}
          ]
        }).present();
    });

  /** Update Billing Failure */

  @Effect({dispatch: false})
  updateBillingFailure$ = this.actions$
    .ofType(Billing.UPDATE_PRICING_FAILURE)
    .map((action: Billing.UpdatePricingFailure) => action.payload)
    .map((err) => {

      /** Close loading dialog */
      this.loadingDialog.dismiss();

      this.modalCtrl.create(DialogComponent,
        {
          title: 'Error',
          content: err,
          buttons: [
            {label: 'Ok', color: 'primary'}
          ]
        }).present();
    });

  /** Loading dialog ref */
  loadingDialog;

  constructor(private actions$: Actions,
              private billingService: BillingService,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController) {
  }
}
