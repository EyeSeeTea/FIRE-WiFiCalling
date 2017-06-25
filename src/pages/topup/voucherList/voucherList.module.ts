import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoucherList } from './voucherList';

@NgModule({
  declarations: [
    VoucherList,
  ],
  imports: [
    IonicPageModule.forChild(VoucherList),
  ],
  exports: [
    VoucherList
  ]
})
export class VoucherListModule {}
