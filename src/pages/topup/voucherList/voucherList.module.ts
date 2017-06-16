import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoucherListPage } from './voucherList';

@NgModule({
  declarations: [
    VoucherListPage,
  ],
  imports: [
    IonicPageModule.forChild(VoucherListPage),
  ],
  exports: [
    VoucherListPage
  ]
})
export class VoucherListModule {}
