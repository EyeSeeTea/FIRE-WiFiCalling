import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CallingPage } from '../call/calling';

@NgModule({
  declarations: [
    CallingPage
  ],
  imports: [
    IonicPageModule.forChild(CallingPage)
  ],
  entryComponents: [
    CallingPage
  ]
})
export class CallingPageModule {};
