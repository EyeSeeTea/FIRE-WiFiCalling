import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';

import { NotificationsPage } from './notifications';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { FilterStateComponent } from './filter-state/filter-state.component';
import { NotifItemComponent } from './notif-item/notif-item.component';
import { ReactiveFormsModule } from "@angular/forms";
import { NotifListComponent } from "./notif-list/notif-list.component";

@NgModule({
  imports: [
    IonicPageModule.forChild(NotificationsPage),
    TranslateModule.forChild(),
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    FilterMenuComponent,
    FilterStateComponent,
    NotifItemComponent,
    NotificationsPage,
    NotifListComponent
  ],
  exports: [
    NotificationsPage
  ]
})
export class NotificationsModule {
}
