import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from '../effects/users.effects';
import { NotificationsEffects } from '../effects/notifications.effects';
import { BillingEffects } from '../effects/billing.effects';
import { reducers } from '../reducers';

import { AdminPage } from './admin';
import { UsersService } from '../services/users.service';
import { NotificationsService } from '../services/notifications.service';
import { BillingService } from '../services/billing.service';

@NgModule({
  imports: [
    IonicPageModule.forChild(AdminPage),
    TranslateModule.forChild(),
    StoreModule.forFeature('admin', reducers),
    EffectsModule.forFeature([UsersEffects, NotificationsEffects, BillingEffects])
  ],
  declarations: [
    AdminPage
  ],
  exports: [
    AdminPage
  ],
  providers: [
    BillingService,
    UsersService,
    NotificationsService
  ]
})
export class AdminModule {
}
