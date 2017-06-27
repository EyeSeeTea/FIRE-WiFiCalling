import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WiFiCallPage } from '../pages/wificall/wificall';
import { AdminPage } from '../pages/admin/admin';

type page = {title: string, component: any};

@Component({
  templateUrl: 'app.html'
})
export class WiFiCalling {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = WiFiCallPage;
  pages: Array<page>;
  activePage: page;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'WifiCall', component: WiFiCallPage },
      { title: 'Admin', component: AdminPage },
      { title: 'Settings', component: WiFiCallPage },
      { title: 'Check Network', component: WiFiCallPage },
      { title: 'About', component: WiFiCallPage },
      { title: 'License', component: WiFiCallPage },
      { title: 'Log Out', component: WiFiCallPage },
    ];
    this.activePage = this.pages[0];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  checkActive(page) {
    return this.activePage === page;
  }
}
