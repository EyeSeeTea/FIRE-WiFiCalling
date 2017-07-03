import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { WiFiCalling } from './app.component';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { appReducer } from '../store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects, AppService } from '../store';

import { WiFiCallPage } from '../pages/wificall/wificall';
import { CallPage } from '../pages/call/call';
import { ContactsPage } from '../pages/contacts/contacts';
import { HistoryPage } from '../pages/history/history';
import { TopupPage } from '../pages/topup/topup';

import { AdminPage } from '../pages/admin/admin';
import { NotificationsPage } from '../pages/notifications/notifications';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserData } from '../providers/user-data';
import { Core } from '../core/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    WiFiCalling,
    WiFiCallPage,
    CallPage,
    ContactsPage,
    HistoryPage,
    TopupPage,
    AdminPage,
    NotificationsPage,
    Core,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(WiFiCalling),
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
    WiFiCallPage,
    CallPage,
    ContactsPage,
    HistoryPage,
    TopupPage,
    AdminPage,
    NotificationsPage
  ],
  providers: [
    AppService,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserData
  ]
})
export class AppModule { }
