import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ISettings } from '../models/settings';

import * as SettingsActions from '../actions/settings';
import * as fromSettings from '../reducers';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {

  settings$; // = this.store.select(fromSettings.getSettings);
  pending$; // = this.store.select(fromSettings.getSettingsPagePending);

  constructor(private store: Store<fromSettings.State>) {
  }

  ionViewWillEnter() {
    // this.store.dispatch(new SettingsActions.GetSettings());
  }

  saveChanges(settings: ISettings) {
    this.store.dispatch(new SettingsActions.UpdateSettings(settings));
  }

}
