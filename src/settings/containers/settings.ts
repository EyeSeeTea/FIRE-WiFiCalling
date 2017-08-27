import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ISettings } from '../models/settings';

import { UpdateSettings } from '../actions/settings';
import { of } from 'rxjs/observable/of';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {

  settings$; // = this.store.select(fromSettings.getSettings);
  pending$; // = this.store.select(fromSettings.getSettingsPagePending);

  constructor(private store: Store<any>) {
  }

  ngOnInit() {

    /** Workaround until we figure out settings */
    this.settings$ = of({
      user: 'joel',
      password: 'joel1234',
      server: 'dev.eyeseetea.com:5000'
    });
    this.pending$ = of(false);
  }

  ionViewWillEnter() {
    // this.store.dispatch(new SettingsActions.GetSettings());
  }

  saveChanges(settings: ISettings) {
    this.store.dispatch(new UpdateSettings(settings));
  }

}
