import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { App, Loading, LoadingController } from 'ionic-angular';
import { Effect, Actions } from '@ngrx/effects';

import { SettingsService } from '../services/settings.service';
import * as Settings from '../actions/settings';

import { User } from '../../auth/models/user';
import { DialogService } from '../../shared/dialog/dialog.service';

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

      /** Show success dialog */
      const successDialog = this.dialogs.successDialog('Settings has been updated.');

      /** Redirect to Login page */
      successDialog.onDidDismiss(() => {
        this.app.getRootNav().setRoot('AuthPage');
      });

      successDialog.present();
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

      /** Show error dialog */
      this.dialogs.errorDialog(err).present();
    });

  loadingDialog: Loading;

  constructor(private actions$: Actions,
              private settingsService: SettingsService,
              private dialogs: DialogService,
              private loadingCtrl: LoadingController,
              private app: App) {
  }

}
