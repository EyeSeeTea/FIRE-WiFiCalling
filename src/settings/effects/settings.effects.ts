import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Effect, Actions } from '@ngrx/effects';

import { SettingsService } from '../services/settings.service';
import * as Settings from '../actions/settings';

import { ISettings } from '../models/settings';
import { DialogComponent } from '../../shared/dialog/dialog';

@Injectable()
export class SettingsEffects {

  /** Get Settings */

  @Effect()
  getSettings$ = this.actions$
    .ofType(Settings.GET_SETTINGS)
    .exhaustMap(() =>
      this.settingsService.getSettings()
        .map((settings: ISettings) => new Settings.GetSettingsSuccess(settings))
        .catch(error => of(new Settings.GetSettingsFailure(error)))
    );

  /** Get Settings Fail */

  @Effect({dispatch: false})
  getSettingsFailure$ = this.actions$
    .ofType(Settings.GET_SETTINGS_FAILURE)
    .map((action: Settings.GetSettingsFailure) => action.payload)
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

  /** Update Settings */

  @Effect()
  updateSettings$ = this.actions$
    .ofType(Settings.UPDATE_SETTINGS)
    .map((action: Settings.UpdateSettings) => action.payload)
    .exhaustMap((pricing) =>
      this.settingsService.updateSettings(pricing)
        .map(() => new Settings.UpdateSettingsSuccess())
        .catch(error => of(new Settings.UpdateSettingsFailure(error)))
    );

  /** Update Settings Success */

  @Effect({dispatch: false})
  updateSettingsSuccess$ = this.actions$
    .ofType(Settings.UPDATE_SETTINGS_SUCCESS)
    .do(() => {

      this.modalCtrl.create(DialogComponent,
        {
          title: 'Success',
          content: 'Pricing updated successfully.',
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

      this.modalCtrl.create(DialogComponent,
        {
          title: 'Error',
          content: err,
          buttons: [
            {label: 'Ok', color: 'primary'}
          ]
        }).present();
    });


  constructor(private actions$: Actions,
              private settingsService: SettingsService,
              private modalCtrl: ModalController) {
  }
}
