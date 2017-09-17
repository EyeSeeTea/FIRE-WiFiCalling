import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '../../reducers';

import { SharedModule } from '../../../shared/shared.module';
import { VoucherDetailsPage } from './voucher-details';
import { VoucherService } from '../../services/voucher.service';
import { VoucherEffects } from '../../effects/voucher.effects';

@NgModule({
  imports: [
    IonicPageModule.forChild(VoucherDetailsPage),
    TranslateModule.forChild(),
    StoreModule.forFeature('settings', reducers),
    EffectsModule.forFeature([VoucherEffects]),
    SharedModule
  ],
  declarations: [
    VoucherDetailsPage
  ],
  exports: [
    VoucherDetailsPage
  ],
  providers: [
    VoucherService
  ]
})
export class AuthModule {
}
