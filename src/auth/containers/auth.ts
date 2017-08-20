import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { loginAnimation, registerAnimation } from '../animations/auth.animations';
import { Store } from '@ngrx/store';
import { Authenticate, RegisterForm } from '../models/user';

import * as Auth from '../actions/auth';
import * as fromAuth from '../reducers';

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
  animations: [loginAnimation, registerAnimation]
})

export class AuthPage {

  /** default active tab */
  selectedTab = 'Login';

  constructor(private store: Store<fromAuth.AuthState>) {
  }

  onLogin(e: Authenticate) {
    this.store.dispatch(new Auth.Login(e));
  }

  onRegister(e: RegisterForm) {
    this.store.dispatch(new Auth.Register(e));
  }

}
