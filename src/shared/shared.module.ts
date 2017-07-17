import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { IonicModule } from 'ionic-angular';
import { InAppBrowser } from "@ionic-native/in-app-browser";

/** OrderModule is used in History to order calls log by date */
import { OrderModule } from 'ngx-order-pipe';

import { HeaderComponent } from './header/header';
import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    TimeAgoPipe
  ],
  imports: [
    IonicModule,
    CommonModule,
    HttpModule,
    OrderModule
  ],
  exports: [
    HeaderComponent,
    OrderModule,
    TimeAgoPipe
  ],
  providers: [
    InAppBrowser
  ]
})
export class SharedModule {
}
