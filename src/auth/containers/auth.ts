import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { loginAnimation, registerAnimation } from '../animations/auth.animations';
import { Store } from '@ngrx/store';
import { Authenticate, RegisterForm } from '../models/user';

import { Login, Register } from '../actions/auth';

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
  animations: [loginAnimation, registerAnimation]
})

export class AuthPage {

  /** default active tab */
  selectedTab = 'Login';

  constructor(private store: Store<any>) {
  }

  onLogin(e: Authenticate) {
    this.store.dispatch(new Login(e));
  }

  onRegister(e: RegisterForm) {
    this.store.dispatch(new Register(e));
  }

}
