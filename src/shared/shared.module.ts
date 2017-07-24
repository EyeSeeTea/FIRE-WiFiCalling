import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { IonicModule } from 'ionic-angular';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { TranslateModule } from '@ngx-translate/core';

/** OrderModule is used in History to order calls log by date */
import { OrderModule } from 'ngx-order-pipe';

import { HeaderComponent } from './header/header';
import { DialogComponent } from './dialog/dialog';
import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    TimeAgoPipe,
    DialogComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    HttpModule,
    TranslateModule.forChild(),
    OrderModule
  ],
  exports: [
    HeaderComponent,
    OrderModule,
    TimeAgoPipe,
    TranslateModule
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [
    InAppBrowser
  ]
})
export class SharedModule {
}
