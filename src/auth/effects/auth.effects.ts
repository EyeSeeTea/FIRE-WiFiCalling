import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { App } from 'ionic-angular';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { AuthService } from '../services/auth.service';
import * as Auth from '../actions/auth';

import { TabsPage } from '../../pages/tabs/tabs';
import { Authenticate, RegisterForm, User } from '../models/user';
import { AuthPage } from '../containers/auth';
import { SecureStorage, SecureStorageObject } from "@ionic-native/secure-storage";

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$
    .ofType(Auth.LOGIN)
    .map((action: Auth.Login) => action.payload)
    .exhaustMap((keys: Authenticate) =>
      this.authService.login(keys)
        .map((user: User) => new Auth.LoginSuccess({user}))
        .catch(error => of(new Auth.LoginFailure(error)))
    );

  @Effect({dispatch: false})
  loginSuccess$ = this.actions$
    .ofType(Auth.LOGIN_SUCCESS)
    .map((action: Auth.Login) => action.payload)
    .map((keys: Authenticate) => {
      this.secureStorage.create('fire-app')
        .then((storage: SecureStorageObject) => storage.set('auth-keys', JSON.stringify(keys)))
        .catch((err) => console.log('Login Success: could not set auth-keys in SecureStorage', err));
      this.appCtrl.getRootNav().setRoot(TabsPage);
    });

  @Effect({dispatch: false})
  loginRedirect$ = this.actions$
    .ofType(Auth.LOGIN_REDIRECT, Auth.LOGOUT)
    .do(authed => this.appCtrl.getRootNav().setRoot(AuthPage));

  @Effect()
  register$ = this.actions$
    .ofType(Auth.REGISTER)
    .map((action: Auth.Register) => action.payload)
    .exhaustMap((form: RegisterForm) =>

      this.authService.register(form)
        .map((user: User) => new Auth.RegisterSuccess(form))
        .catch(error => of(new Auth.RegisterFailure(error)))
    );

  @Effect({dispatch: false})
  registerSuccess$ = this.actions$
    .ofType(Auth.REGISTER_SUCCESS)
    .map((action: Auth.Register) => action.payload)
    .map((form: RegisterForm) => <Authenticate>{username: form.username, password: form.password})
    .map((cred: Authenticate) => new Auth.Login(cred));

  @Effect({dispatch: false})
  failure$ = this.actions$
    .ofType(Auth.REGISTER_FAILURE, Auth.LOGIN_FAILURE)
    .do(() => {
      // handle errors here
    });

  constructor(private actions$: Actions,
              private authService: AuthService,
              private appCtrl: App,
              private secureStorage: SecureStorage) {
  }
}
