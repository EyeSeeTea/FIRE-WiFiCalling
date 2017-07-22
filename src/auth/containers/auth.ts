import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { pageAnimation } from '../animations/auth.animations';
import { Store } from '@ngrx/store';
import { Authenticate, RegisterForm } from '../models/user';

import * as fromAuth from '../reducers';
import * as Auth from '../actions/auth';

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
  animations: [pageAnimation]
})

export class AuthPage {

  /** default active tab */
  selectedTab = 'Login';

  pending$ = this.store.select(fromAuth.getAuthPagePending);
  error$ = this.store.select(fromAuth.getAuthPageError);

  constructor(private store: Store<fromAuth.State>) {
    this.pending$.subscribe((pending) => {
      console.log('loading:', pending);
    });
    this.error$.subscribe((err)=>{
      console.log(err);
    });
  }

  onLogin(e: Authenticate) {
    this.store.dispatch(new Auth.Login(e));
  }

  onRegister(e: RegisterForm){
    this.store.dispatch(new Auth.Register(e));
  }

}
