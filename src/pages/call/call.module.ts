import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../shared/shared.module';

import { CallPage } from './call';

@NgModule({
  declarations: [
    CallPage
  ],
  imports: [
    IonicPageModule.forChild(CallPage),
    SharedModule
  ],
  exports: [
    CallPage
  ]
})
export class CallPageModule {}
