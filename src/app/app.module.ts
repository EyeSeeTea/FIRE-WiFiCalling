import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { WificallPage } from '../pages/wificall/wificall';
import { CallPage } from '../pages/call/call';
import { ContactsPage } from '../pages/contacts/contacts';
import { HistoryPage } from '../pages/history/history';
import { TopupPage } from '../pages/topup/topup';
import { AddVoucherPage } from '../pages/topup/addVoucher/addVoucher';
import { VoucherListPage } from '../pages/topup/voucherList/voucherList';


import { AdminPage } from '../pages/admin/admin';
import { NotificationsPage } from '../pages/notifications/notifications';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HeaderComponent } from '../components/header/header';
import { UserData } from '../providers/user-data.ts';
import { Voucher } from '../providers/voucher.ts';

@NgModule({
  declarations: [
    MyApp,
    WificallPage,
    CallPage,
    ContactsPage,
    HistoryPage,
    TopupPage,
    AdminPage,
    NotificationsPage,
    HeaderComponent,
    AddVoucherPage,
    VoucherListPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WificallPage,
    CallPage,
    ContactsPage,
    HistoryPage,
    TopupPage,
    AdminPage,
    NotificationsPage,
    AddVoucherPage,
    VoucherListPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserData,
    Voucher,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
