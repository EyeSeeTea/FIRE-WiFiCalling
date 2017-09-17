import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../shared/shared.module';
import { VoucherEffects } from '../effects/voucher.effects';
import { reducers } from '../reducers';

import { TopUpPage } from './topup';
import { AddVoucherComponent } from '../components/add-voucher/add-voucher.component';
import { VoucherListComponent } from '../components/voucher-list/voucher-list.component';
import { VoucherItemComponent } from '../components/voucher-list/voucher-item/voucher-item.component';

import { VoucherService } from '../services/voucher.service';

@NgModule({
  imports: [
    IonicPageModule.forChild(TopUpPage),
    TranslateModule.forChild(),
    StoreModule.forFeature('vouchers', reducers),
    EffectsModule.forFeature([VoucherEffects]),
    SharedModule
  ],
  declarations: [
    TopUpPage,
    AddVoucherComponent,
    VoucherListComponent,
    VoucherItemComponent
  ],
  exports: [
    TopUpPage
  ],
  providers: [
    VoucherService
  ]
})
export class VoucherModule {
}
