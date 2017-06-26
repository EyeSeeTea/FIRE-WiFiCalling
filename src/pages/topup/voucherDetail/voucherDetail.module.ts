import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoucherDetail } from './voucherDetail';

@NgModule({
  declarations: [
    VoucherDetail,
  ],
  imports: [
    IonicPageModule.forChild(VoucherDetail),
  ],
  exports: [
    VoucherDetail
  ]
})
export class VoucherDetailModule {}
