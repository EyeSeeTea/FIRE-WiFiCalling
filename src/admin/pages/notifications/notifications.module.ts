import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';

import { NotificationsPage } from './notifications';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { FilterStateComponent } from './filter-state/filter-state.component';
import { NotifItemComponent } from './notif-item/notif-item.component';
import { NotifListComponent } from './notif-list/notif-list.component';
import { NotifNavComponent } from './notif-nav/notif-nav.component';
import { NotifWrapperComponent } from './notif-wrapper/notif-wrapper.component';

@NgModule({
  imports: [
    IonicPageModule.forChild(NotificationsPage),
    TranslateModule.forChild(),
    SharedModule
  ],
  declarations: [
    FilterMenuComponent,
    FilterStateComponent,
    NotifItemComponent,
    NotificationsPage,
    NotifListComponent,
    NotifNavComponent,
    NotifWrapperComponent
  ],
  exports: [
    NotificationsPage
  ]
})
export class NotificationsModule {
}
