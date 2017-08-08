import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

import { TabsPage } from '../pages/tabs/tabs';
import { AdminPage } from '../pages/admin/admin';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { Globalization } from '@ionic-native/globalization';
import { defaultLang, getSuitableLanguage } from './i18n.constants';

@Component({
  template: `
    <main [state]="store | async" [pages]="pages"></main>
  `
})
export class WiFiCalling {

  pages;

  constructor(platform: Platform, translate: TranslateService, statusBar: StatusBar, splashScreen: SplashScreen, public store: Store<AppState>, private globalization: Globalization) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      translate.setDefaultLang(defaultLang);


      this.globalization.getPreferredLanguage()
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

    this.pages = [
      { title: 'WifiCall', component: TabsPage },
      { title: 'ACCESS.LOGIN', component: 'AccessPage' },
      { title: 'MENU.ADMIN', component: AdminPage },
      { title: 'MENU.SETTINGS', component: TabsPage },
      { title: 'Check Network', component: TabsPage },
      { title: 'MENU.ABOUT', component: TabsPage },
      { title: 'MENU.LICENSE', component: TabsPage },
      { title: 'MENU.LOGOUT', component: TabsPage },
    ];
  }
}
