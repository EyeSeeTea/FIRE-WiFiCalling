import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Globalization } from '@ionic-native/globalization';
import { defaultLang, getSuitableLanguage } from './i18n.constants';

import * as Auth from '../auth/actions/auth';

import { TabsPage } from '../pages/tabs/tabs';
import { AdminPage } from '../pages/admin/admin';

type Page = { title: string, component?: any };

@Component({
  templateUrl: 'app.component.html'
})
export class WiFiCalling {

  @ViewChild(Nav) nav: Nav;

  /** Root page is our tabs */
  rootPage = TabsPage;

  /** Highlight active page in the menu */
  activePage: Page;

  /** Menu items */
  pages = [
    {title: 'WifiCall', component: TabsPage},
    {title: 'MENU.ADMIN', component: AdminPage},
    {title: 'MENU.SETTINGS', component: TabsPage},
    {title: 'Check Network', component: TabsPage},
    {title: 'MENU.ABOUT', component: TabsPage},
    {title: 'MENU.LICENSE', component: TabsPage},
    {title: 'MENU.LOGOUT'}
  ];

  constructor(platform: Platform,
              translate: TranslateService,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              globalization: Globalization,
              public store: Store<any>) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      /** Initialize translation */
      translate.setDefaultLang(defaultLang);
      globalization.getPreferredLanguage()
        .then(result => {
          const language = getSuitableLanguage(result.value);
          translate.use(language);
        })
        .catch(err => {
          const browserLanguage = translate.getBrowserLang() || defaultLang;
          const language = getSuitableLanguage(browserLanguage);
          translate.use(language);
        })
    });

  }

  onMenuClick(page) {

    if (page.title === 'MENU.LOGOUT') {
      this.store.dispatch(new Auth.Logout());
    } else {
    this.nav.push(page.component);
    this.activePage = page;
    }
  }
}
