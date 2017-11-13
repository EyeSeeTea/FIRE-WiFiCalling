import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization';
import { defaultLang, getSuitableLanguage } from './i18n.constants';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  template: `
    <ion-nav [root]="rootPage"></ion-nav>
    <call-worker></call-worker>
  `
})
export class WiFiCalling {

  @ViewChild(Nav) nav: Nav;

  /** Root page tabs */
  rootPage = TabsPage;


  constructor(platform: Platform,
              translate: TranslateService,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              globalization: Globalization) {

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

}
