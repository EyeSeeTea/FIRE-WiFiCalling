import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Contacts } from '@ionic-native/contacts';

import { StoreModule } from '@ngrx/store';
import { appReducer } from '../store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects, AppService } from '../store';

import { WiFiCalling } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { CallPage } from '../pages/call/call';
import { CallingPage } from '../pages/call/calling';
import { HistoryPage } from '../pages/history/history';
import { TopupPage } from '../pages/topup/topup';
import { ContactsPage } from '../pages/contacts/contacts';

import { AdminPage } from '../pages/admin/admin';
import { NotificationsPage } from '../pages/notifications/notifications';

import { UserData } from '../providers/user-data';
import { Core } from '../core/core';
import { SharedModule } from '../shared/shared.module';

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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserData
  ]
})
export class AppModule {
}
