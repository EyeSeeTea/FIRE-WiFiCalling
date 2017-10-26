import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Ionic native plugins

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Contacts } from '@ionic-native/contacts';
import { Globalization } from '@ionic-native/globalization';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { metaReducers, reducers } from '../reducers';
import * as auth from '../auth/reducers';
import * as router from '../router/reducers';
import { AuthEffects } from '../auth/effects/auth.effects';
import { RouterEffects } from '../router/effects/router.effects';

import { FireHttpModule } from '../auth/http/fire-http.module';
import { CallWorkerModule } from '../calling/containers/call-worker.module';
import { SharedModule } from '../shared/shared.module';

import { WiFiCalling } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HistoryPage } from '../pages/history/history';
import { ContactsPage } from '../pages/contacts/contacts';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    WiFiCalling,
    TabsPage,
    HistoryPage,
    ContactsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(WiFiCalling, {
      backButtonText: ''
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    SharedModule,
    FireHttpModule.forRoot(),
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreModule.forFeature('auth', auth.reducers),
    StoreModule.forFeature('router', router.reducers),
    EffectsModule.forRoot([AuthEffects, RouterEffects]),
    StoreDevtoolsModule.instrument(),
    CallWorkerModule
  ],
  entryComponents: [
    WiFiCalling,
    TabsPage,
    HistoryPage,
    ContactsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Contacts,
    Globalization,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  bootstrap: [IonicApp]
})
export class AppModule {
}
