import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Contacts } from '@ionic-native/contacts';
import { Globalization } from '@ionic-native/globalization';

import { StoreModule } from '@ngrx/store';
import { appReducer } from '../store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppEffects, AppService } from '../store';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { WiFiCalling } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { CallPage } from '../pages/call/call';
import { CallingPage } from '../pages/call/calling';
import { HistoryPage } from '../pages/history/history';
import { TopupPage } from '../pages/topup/topup';
import { ContactsPage } from '../pages/contacts/contacts';

import { AdminPage } from '../pages/admin/admin';
import { NotificationsPage } from '../pages/notifications/notifications';

import { Core } from '../core/core';
import { SharedModule } from '../shared/shared.module';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    WiFiCalling,
    TabsPage,
    CallPage,
    CallingPage,
    HistoryPage,
    TopupPage,
    AdminPage,
    NotificationsPage,
    ContactsPage,
    Core,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(WiFiCalling),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    BrowserAnimationsModule,
    HttpModule,
    SharedModule,
    StoreModule.provideStore(appReducer),
    EffectsModule.run(AppEffects),
    /** StoreDevtoolsModule is only for dev, will be removed in Production */
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    WiFiCalling,
    TabsPage,
    CallPage,
    CallingPage,
    HistoryPage,
    TopupPage,
    AdminPage,
    NotificationsPage,
    ContactsPage
  ],
  providers: [
    AppService,
    StatusBar,
    SplashScreen,
    Contacts,
    Globalization,

    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {
}
