import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Authenticate, RegisterForm } from '../models/user';
import { slideRTLAnimation, slideLTRAnimation } from '../../shared/animations/shared.animations';
import * as Auth from '../actions/auth';

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
  animations: [slideRTLAnimation, slideLTRAnimation]
})

export class AuthPage {

  /** default active tab */
  selectedTab = 'Login';

  constructor(private store: Store<any>) {
  }

  onLogin(keys: Authenticate) {
    this.store.dispatch(new Auth.Login(keys));
  }

  onRegister(form: RegisterForm) {
    this.store.dispatch(new Auth.Register(form));
  }

}
