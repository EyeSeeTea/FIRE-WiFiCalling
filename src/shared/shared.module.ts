import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

/** OrderModule is used in History to order calls log by date */
import { OrderModule } from 'ngx-order-pipe';

import { HeaderComponent } from './header/header';
import { DialogComponent } from './dialog/dialog';
import { TimeAgoPipe } from 'time-ago-pipe';
import { MarkPopupComponent } from "../admin/pages/notifications/mark-popup/mark-popup.component";
import { MessageDialogComponent } from "../admin/pages/users/message-dialog/message-dialog.component";

@NgModule({
  declarations: [
    HeaderComponent,
    TimeAgoPipe,
    DialogComponent,
    MessageDialogComponent,
    MarkPopupComponent
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
    DialogComponent,
    MessageDialogComponent,
    MarkPopupComponent
  ]
})
export class SharedModule {
}
