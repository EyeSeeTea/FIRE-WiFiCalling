import { IonicPage } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { of } from 'rxjs/observable/of';
import { User } from '../../auth/models/user';
import { getLoggedIn, getUser } from '../../auth/reducers';
import * as Settings from '../actions/settings';
import { FireHttp } from '../../auth/http/fire-http';

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

  constructor(private store: Store<any>, private http: FireHttp) {
  }

  ngOnInit() {

    /** TODO: Replace with auth state when login endpoint is ready */
    this.settings$ = of({
      username: '',
      password: '',
      serverHost: this.http.baseUrl
    });
  }

  saveChanges(user: User) {
    this.store.dispatch(new Settings.UpdateSettings(user));
  }

}
