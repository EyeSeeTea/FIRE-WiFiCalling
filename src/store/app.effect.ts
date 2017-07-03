import { AppStore } from './app.reducer';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { App, AlertController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/withLatestFrom';
import { LoginPage } from '../pages/login/login';
import { WiFiCallPage } from '../pages/wificall/wificall';

@Injectable()
export class AppEffects {
  constructor(private http: Http,
              private actions$: Actions,
              private alertCtrl: AlertController,
              private appCtrl: App) {
  }

  @Effect()
  login$ = this.actions$
    .ofType(AppStore.LOGIN)
    .switchMap(action => {
      /** TODO: Authenticate username & password with real server */
      console.log('[Logging in]:', action.payload);
      return this.http.get('../assets/mock.json')
        .map(res => {
          this.appCtrl.getRootNav().push(WiFiCallPage);
          return {type: AppStore.AUTHENTICATION, payload: {user: res.json(), authenticated: true}};
        })
        .catch((err) => {
          const alert = this.alertCtrl.create({
            title: 'Login Failed!',
            subTitle: err,
            buttons: ['OK']
          });
          alert.present();
          return Observable.empty();
        });
    });

  @Effect()
  logout$ = this.actions$
    .ofType(AppStore.LOGOUT)
    .map((action) => {
      console.log('[Logout]');
      this.appCtrl.getRootNav().setRoot(LoginPage);
      return {type: AppStore.AUTHENTICATION, payload: {user: undefined, authenticated: false}};
    });

  @Effect()
  register$ = this.actions$
    .ofType(AppStore.REGISTER)
    .switchMap(action => {
      console.log('[Register]:', action.payload);
      return this.http.get('../assets/mock.json')
        .map(res => {
          this.appCtrl.getRootNav().push(WiFiCallPage);
          return {type: AppStore.LOGIN, payload: {user: res.json(), authenticated: true}};
        })
        .catch((err) => {

          const alert = this.alertCtrl.create({
            title: 'Register Failed!',
            subTitle: err,
            buttons: ['OK']
          });
          alert.present();
          return Observable.empty();
        });
    });

  // @Effect()
  // guard$ = this.actions$
  //   .ofType(AppStore.NAVIGATE)
  //   .withLatestFrom(this.store)
  //   // .filter(([action, state]) => !state.user)
  //   .map(([action, state]) => {
  //     console.log(action);
  //     if (!state.user) {
  //       console.log('should navigate to Login page');
  //       this.appCtrl.getRootNav().setRoot(LoginPage);
  //       return {type: AppStore.PAGE, payload: LoginPage};
  //     }
  //     console.log('should navigate to', action.payload);
  //     this.appCtrl.getRootNav().push(action.payload);
  //     return {type: AppStore.PAGE, page: action.payload};
  //   });

}
