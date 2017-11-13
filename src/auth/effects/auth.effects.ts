import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { App, LoadingController, Loading } from 'ionic-angular';
import { Effect, Actions } from '@ngrx/effects';

import { AuthService } from '../services/auth.service';
import * as Auth from '../actions/auth';
import * as Sip from '../../calling/actions/sip';

import { TabsPage } from '../../pages/tabs/tabs';
import { Authenticate, RegisterForm, User } from '../models/user';
import { DialogService } from '../../shared/dialog/dialog.service';

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
        .map((user: User) => new Auth.LoginSuccess(user))
        .catch(error => of(new Auth.LoginFailure(error)))
    });

  /** Login success */

  @Effect()
  loginSuccess$ = this.actions$
    .ofType(Auth.LOGIN_SUCCESS)
    .map((action: Auth.LoginSuccess) => action.payload)
    .exhaustMap((user: User) => {

      /** Close loading dialog */
      if (this.loadingDialog) {
        this.loadingDialog.dismiss();
      }

      /** Navigate to home page */
      this.app.getRootNav().setRoot(TabsPage);

      /** Initialize SIP with user settings */
      return of(new Sip.Initialize(user));
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
        .map((res: any) => new Auth.RegisterSuccess(res))
        .catch(error => of(new Auth.RegisterFailure(error)))
    });

  /** Register success */

  @Effect({dispatch: false})
  registerSuccess$ = this.actions$
    .ofType(Auth.REGISTER_SUCCESS)
    .map((action: Auth.LoginSuccess) => action.payload)
    .do((res) => {

      /** Close loading dialog */
      if (this.loadingDialog) {
        this.loadingDialog.dismiss();
      }

      /** Show success dialog */
      this.dialogs.successDialog('Your account request will be reviewed by the admin.').present();
    });


  /** Login/Register Fail */

  @Effect({dispatch: false})
  failure$ = this.actions$
    .ofType(Auth.REGISTER_FAILURE, Auth.LOGIN_FAILURE)
    .map((action: Auth.LoginFailure) => action.payload)
    .do((err) => {

      /** Close loading dialog */
      if (this.loadingDialog) {
        this.loadingDialog.dismiss();
      }

      if (err) {
        /** Show error dialog */
        this.dialogs.errorDialog(err.error.message).present();
      }
    });

  /** Logout */

  @Effect()
  logout$ = this.actions$
    .ofType(Auth.LOGOUT)
    .exhaustMap(() => of(new Auth.RedirectLogin()));


  /** Redirect to login page */

  @Effect({dispatch: false})
  redirect$ = this.actions$
    .ofType(Auth.REDIRECT_LOGIN)
    .do(() => this.app.getRootNav().setRoot('AuthPage'));

  /** Loading dialog ref */
  loadingDialog: Loading;

  constructor(private actions$: Actions,
              private authService: AuthService,
              private app: App,
              private loadingCtrl: LoadingController,
              private dialogs: DialogService) {
  }
}
