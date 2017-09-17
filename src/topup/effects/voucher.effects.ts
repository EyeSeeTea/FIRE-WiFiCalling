import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { Effect, Actions } from '@ngrx/effects';

import { VoucherService } from '../services/voucher.service';
import * as TopUp from '../actions/voucher';

import { Voucher } from '../models/voucher';
import { DialogService } from '../../shared/dialog/dialog.service';

@Injectable()
export class VoucherEffects {

  /** Get Vouchers List */

  @Effect()
  vouchers$ = this.actions$
    .ofType(TopUp.GET_LIST)
    .map((action: TopUp.GetList) => action.payload)
    .exhaustMap((userId: number) => {

      /** Get vouchers for specific user */
      return this.voucherService.getVoucher(userId)
        .map((vouchers: Voucher[]) => new TopUp.GetListSuccess(vouchers))
        .catch(error => of(new TopUp.GetListFailure(error)))
    });

  /** Add Voucher */

  @Effect()
  addVoucher$ = this.actions$
    .ofType(TopUp.ADD_VOUCHER)
    .map((action: TopUp.AddVoucher) => action.payload)
    .exhaustMap((voucher: Voucher) => {

      /** Show loading dialog */
      this.loadingDialog = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loadingDialog.present();

      return this.voucherService.addVoucher(0, voucher)
        .map((res) => new TopUp.AddVoucherSuccess(voucher))
        .catch(error => of(new TopUp.AddVoucherFailure(error)))
    });

  /** Add Voucher Success */

  @Effect({dispatch: false})
  addVoucherSuccess$ = this.actions$
    .ofType(TopUp.ADD_VOUCHER_SUCCESS)
    .map((action: TopUp.AddVoucherSuccess) => action.payload)
    .map((voucher: Voucher) => {

      /** Close loading dialog */
      if(this.loadingDialog) {
        this.loadingDialog.dismiss();
      }

      /** Show success dialog */
      this.dialogs.successDialog(`Congratulations, your account has been topped up with ${voucher.creditRemaining} rands.`).present();
    });


  /** Add Voucher / Get Vouchers list Fail */

  @Effect({dispatch: false})
  failure$ = this.actions$
    .ofType(TopUp.ADD_VOUCHER_FAILURE, TopUp.GET_LIST_FAILURE)
    .map((action: TopUp.AddVoucherFailure) => action.payload)
    .map((err) => {

      /** Close loading dialog */
      if(this.loadingDialog) {
        this.loadingDialog.dismiss();
      }

      /** Show error dialog */
      this.dialogs.errorDialog(err).present();
    });

  /** Loading dialog ref */
  loadingDialog: Loading;

  constructor(private actions$: Actions,
              private voucherService: VoucherService,
              private dialogs: DialogService,
              private loadingCtrl: LoadingController) {
  }
}
