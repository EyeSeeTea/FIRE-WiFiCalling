import { AppStore } from './app.reducer';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { App, AlertController } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/withLatestFrom';

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
      /** TODO: Authenticate username & password a real server */
      console.log('[Logging in]:', action.payload);
      return this.http.get('../assets/mock.json')
        .map(res => {
          this.appCtrl.getRootNav().setRoot(TabsPage);
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
      this.appCtrl.getRootNav().setRoot('AccessPage');
      return {type: AppStore.AUTHENTICATION, payload: {user: undefined, authenticated: false}};
    });

  @Effect()
  register$ = this.actions$
    .ofType(AppStore.REGISTER)
    .switchMap(action => {
      /** TODO: Register with a real server */
      console.log('[Register]:', action.payload);
      return this.http.get('../assets/mock.json')
        .map(res => {
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

}
