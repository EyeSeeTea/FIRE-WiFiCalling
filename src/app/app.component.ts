import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WiFiCallPage } from '../pages/wificall/wificall';
import { AdminPage } from '../pages/admin/admin';
import { LoginPage } from '../pages/login/login';
import { Store } from '@ngrx/store';
import { AppState } from '../store';

@Component({
  template: `
    <main [state]="store | async" [pages]="pages"></main>
  `
})
export class WiFiCalling {

  pages;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public store: Store<AppState>) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      {title: 'WifiCall', component: WiFiCallPage},
      {title: 'Login', component: LoginPage},
      {title: 'Admin', component: AdminPage},
      {title: 'Settings', component: WiFiCallPage},
      {title: 'Check Network', component: WiFiCallPage},
      {title: 'About', component: WiFiCallPage},
      {title: 'License', component: WiFiCallPage},
      {title: 'Log Out', component: WiFiCallPage},
    ];

  }
}
