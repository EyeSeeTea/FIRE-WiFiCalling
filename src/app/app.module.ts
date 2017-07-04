import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { WiFiCalling } from './app.component';

import { WiFiCallPage } from '../pages/wificall/wificall';
import { CallPage } from '../pages/call/call';
import { CallingPage } from '../pages/call/calling';
import { ContactsPage } from '../pages/contacts/contacts';
import { HistoryPage } from '../pages/history/history';
import { TopupPage } from '../pages/topup/topup';

import { AdminPage } from '../pages/admin/admin';
import { NotificationsPage } from '../pages/notifications/notifications';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HeaderComponent } from '../components/header/header';
import { UserData } from '../providers/user-data.ts';

@NgModule({
  declarations: [
    WiFiCalling,
    WiFiCallPage,
    CallPage,
    CallingPage,
    ContactsPage,
    HistoryPage,
    TopupPage,
    AdminPage,
    NotificationsPage,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(WiFiCalling),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    WiFiCalling,
    WiFiCallPage,
    CallPage,
    CallingPage,
    ContactsPage,
    HistoryPage,
    TopupPage,
    AdminPage,
    NotificationsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserData,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
