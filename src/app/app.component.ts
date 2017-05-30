import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WificallPage } from '../pages/wificall/wificall';
import { AdminPage } from '../pages/admin/admin';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = WificallPage;
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      {title: 'WifiCall', component: WificallPage},
      {title: 'Admin', component: AdminPage},
      {title: 'Settings', component: WificallPage},
      {title: 'Check Network', component: WificallPage},
      {title: 'About', component: WificallPage},
      {title: 'License', component: WificallPage},
      {title: 'Log Out', component: WificallPage},
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
