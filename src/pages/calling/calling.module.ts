import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../shared/shared.module';

import { CallingPage } from './calling';

@NgModule({
  declarations: [
    CallingPage
  ],
  imports: [
    IonicPageModule.forChild(CallingPage),
    SharedModule
  ],
  exports: [
    CallingPage
  ]
})
export class CallingPageModule {}
