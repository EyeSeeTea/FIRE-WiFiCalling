import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../shared/shared.module';

import { CallTypePage } from './call-type';

@NgModule({
  declarations: [
    CallTypePage
  ],
  imports: [
    IonicPageModule.forChild(CallTypePage),
    SharedModule
  ],
  exports: [
    CallTypePage
  ]
})
export class CallTypePageModule {}
