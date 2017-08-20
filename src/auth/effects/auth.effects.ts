import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { ModalController, App, LoadingController } from 'ionic-angular';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Effect, Actions } from '@ngrx/effects';

import { AuthService } from '../services/auth.service';
import * as Auth from '../actions/auth';

import { TabsPage } from '../../pages/tabs/tabs';
import { Authenticate, RegisterForm, User } from '../models/user';
import { DialogComponent } from '../../shared/dialog/dialog';

@Injectable()
export class AuthEffects {

  /** Login */

  @Effect()
  login$ = this.actions$
    .ofType(Auth.LOGIN)
    .map((action: Auth.Login) => action.payload)
    .exhaustMap((keys: Authenticate) => {

      /** Show loading dialog */
      this.loadingDialog = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loadingDialog.present();

      return this.authService.login(keys)
        .map((user: User) => new Auth.LoginSuccess({user}))
        .catch(error => of(new Auth.LoginFailure(error)))
    });

  /** Login success */

  @Effect({dispatch: false})
  loginSuccess$ = this.actions$
    .ofType(Auth.LOGIN_SUCCESS)
    .map((action: Auth.Login) => action.payload)
    .map((keys: Authenticate) => {

      /** Close loading dialog */
      this.loadingDialog.dismiss();

      this.secureStorage.create('fire-app')
        .then((storage: SecureStorageObject) => storage.set('auth-keys', JSON.stringify(keys)))
        .catch((err) => console.log('Login Success: could not set auth-keys in SecureStorage', err));

      /** Navigate to home page */
      this.appCtrl.getRootNav().setRoot(TabsPage);
    });

  /** Redirect to login page */

  @Effect({dispatch: false})
  loginRedirect$ = this.actions$
    .ofType(Auth.LOGIN_REDIRECT, Auth.LOGOUT)
    .do(() => {
      console.log('REDIRECTING...');
      this.appCtrl.getRootNavs()[0].push('AuthPage');
    });

  /** Register new user */

  @Effect()
  register$ = this.actions$
    .ofType(Auth.REGISTER)
    .map((action: Auth.Register) => action.payload)
    .exhaustMap((form: RegisterForm) => {

      /** Show loading dialog */
      this.loadingDialog = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loadingDialog.present();

      return this.authService.register(form)
        .map((user: User) => new Auth.RegisterSuccess(form))
        .catch(error => of(new Auth.RegisterFailure(error)))
    });

  /** Register success */

  /** TODO: Autologin after register, replace form.email with form.username
   * (waiting for a decision https://github.com/EyeSeeTea/FIRE-WiFiCalling/issues/37) */

  @Effect({dispatch: false})
  registerSuccess$ = this.actions$
    .ofType(Auth.REGISTER_SUCCESS)
    .do(() => {

      /** Close loading dialog */
      this.loadingDialog.dismiss();

      this.modalCtrl.create(DialogComponent,
        {
          title: 'Success',
          content: 'Your account request will be reviewed by the admin.',
          buttons: [
            {label: 'Ok', color: 'primary'}
          ]
        }).present();
    });


  /** Login/Register Fail */

  @Effect({dispatch: false})
  failure$ = this.actions$
    .ofType(Auth.REGISTER_FAILURE, Auth.LOGIN_FAILURE)
    .map((action: Auth.LoginFailure) => action.payload)
    .map((err) => {

      /** Close loading dialog */
      this.loadingDialog.dismiss();

      this.modalCtrl.create(DialogComponent,
        {
          title: 'Error',
          content: 'Login/Register failed',
          buttons: [
            {label: 'Ok', color: 'primary'}
          ]
        }).present();
    });

  /** Loading dialog ref */
  loadingDialog;

  constructor(private actions$: Actions,
              private authService: AuthService,
              private appCtrl: App,
              private secureStorage: SecureStorage,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController) {
  }
}
