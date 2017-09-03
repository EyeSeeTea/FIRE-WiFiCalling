import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';
import { Effect, Actions } from '@ngrx/effects';

import { BillingService } from '../services/billing.service';
import * as Billing from '../actions/billing';

import { Pricing } from '../models/billing';
import { DialogService } from '../../shared/dialog/dialog.service';

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

  /** Update Billing */

  @Effect()
  updateBilling$ = this.actions$
    .ofType(Billing.UPDATE_PRICING)
    .map((action: Billing.UpdatePricing) => action.payload)
    .exhaustMap((pricing: Pricing) => {

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
      if(this.loadingDialog){
        this.loadingDialog.dismiss();
      }

      /** Show success dialog */
      this.dialogs.successDialog('Pricing updated successfully.').present();
    });

  /** Handle billing failures */

  @Effect({dispatch: false})
  billingFailure$ = this.actions$
    .ofType(Billing.UPDATE_PRICING_FAILURE, Billing.GET_PRICING_FAILURE)
    .map((action: Billing.UpdatePricingFailure) => action.payload)
    .map((err) => {

      /** Close loading dialog */
      if(this.loadingDialog){
        this.loadingDialog.dismiss();
      }

      /** Show error dialog */
      this.dialogs.errorDialog(err).present();
    });

  /** Loading dialog ref */
  loadingDialog: Loading;

  constructor(private actions$: Actions,
              private billingService: BillingService,
              private loadingCtrl: LoadingController,
              private dialogs: DialogService) {
  }
}
