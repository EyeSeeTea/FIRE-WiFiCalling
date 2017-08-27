import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

/** OrderModule is used in History page and Admin Users page */
import { OrderModule } from 'ngx-order-pipe';

/** FilterPipe is used in Admin Users page */
import { FilterPipeModule } from 'ngx-filter-pipe';

import { TimeAgoPipe } from 'time-ago-pipe';

import { HeaderComponent } from './header/header';
import { DialogComponent } from './dialog/dialog';
import { SearchInputComponent } from './input/search-input.component';

import { MarkPopupComponent } from '../admin/pages/notifications/mark-popup/mark-popup.component';
import { MessageDialogComponent } from '../admin/pages/users/message-dialog/message-dialog.component';
import { MenuDialogComponent } from './menu-dialog/menu-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DialogComponent,
    MessageDialogComponent,
    MenuDialogComponent,
    MarkPopupComponent,
    SearchInputComponent,
    TimeAgoPipe
  ],
  imports: [
    IonicModule,
    CommonModule,
    HttpModule,
    TranslateModule.forChild(),
    OrderModule,
    FilterPipeModule,
    ReactiveFormsModule
  ],
  exports: [
    TranslateModule,
    FilterPipeModule,
    ReactiveFormsModule,
    OrderModule,
    HeaderComponent,
    SearchInputComponent,
    TimeAgoPipe
  ],
  entryComponents: [
    DialogComponent,
    MessageDialogComponent,
    MenuDialogComponent,
    MarkPopupComponent
  ]
})
export class SharedModule {
}
