import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddVoucherPage } from './addVoucher';

@NgModule({
  declarations: [
    AddVoucherPage,
  ],
  imports: [
    IonicPageModule.forChild(AddVoucherPage),
  ],
  exports: [
    AddVoucherPage
  ]
})
export class AddVoucherModule {}
