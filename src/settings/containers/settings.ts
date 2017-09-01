import { IonicPage } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { of } from 'rxjs/observable/of';
import { User } from '../../auth/models/user';
import { getLoggedIn, getUser } from '../../auth/reducers';
import * as Settings from '../actions/settings';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage implements OnInit {

  /** Settings values */
  settings$; // = this.store.select(getSettings);

  /** User logged in state */
  loggedIn$ = this.store.select(getLoggedIn);
  user$ = this.store.select(getUser);

  constructor(private store: Store<any>) {
  }

  ngOnInit() {

    /** TODO: Replace with store auth state when login endpoint is ready */
    this.settings$ = of({
      username: '',
      password: '',
      serverHost: 'dev.est:5000'
    });
  }

  saveChanges(user: User) {
    this.store.dispatch(new Settings.UpdateSettings(user));
  }

}
