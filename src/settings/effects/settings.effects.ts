import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Loading, LoadingController, ModalController } from 'ionic-angular';
import { Effect, Actions } from '@ngrx/effects';

import { SettingsService } from '../services/settings.service';
import * as Settings from '../actions/settings';

import { DialogComponent } from '../../shared/dialog/dialog';
import { User } from "../../auth/models/user";

@Injectable()
export class SettingsEffects {

  /** Update Settings */

  @Effect()
  updateSettings$ = this.actions$
    .ofType(Settings.UPDATE_SETTINGS)
    .map((action: Settings.UpdateSettings) => action.payload)
    .exhaustMap((user: User) => {

      /** Show loading dialog */
      this.loadingDialog = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loadingDialog.present();

      return this.settingsService.updateSettings(user)
        .map(() => new Settings.UpdateSettingsSuccess())
        .catch(error => of(new Settings.UpdateSettingsFailure(error)));
    });

  /** Update Settings Success */

  @Effect({dispatch: false})
  updateSettingsSuccess$ = this.actions$
    .ofType(Settings.UPDATE_SETTINGS_SUCCESS)
    .do(() => {

      /** Close loading dialog */
      if (this.loadingDialog) {
        this.loadingDialog.dismiss();
      }

      this.modalCtrl.create(DialogComponent,
        {
          title: 'Success',
          content: 'Settings has been updated.',
          buttons: [
            {label: 'Ok', color: 'link'}
          ]
        }).present();
    });

  /** Update Settings Failure */

  @Effect({dispatch: false})
  updateSettingsFailure$ = this.actions$
    .ofType(Settings.UPDATE_SETTINGS_FAILURE)
    .map((action: Settings.UpdateSettingsFailure) => action.payload)
    .map((err) => {

      /** Close loading dialog */
      if (this.loadingDialog) {
        this.loadingDialog.dismiss();
      }

      this.modalCtrl.create(DialogComponent,
        {
          title: 'Error',
          content: err,
          buttons: [
            {label: 'Ok', color: 'primary'}
          ]
        }).present();
    });

  loadingDialog: Loading;

  constructor(private actions$: Actions,
              private settingsService: SettingsService,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController) {
  }
}
