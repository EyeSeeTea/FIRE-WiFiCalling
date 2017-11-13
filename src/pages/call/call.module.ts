import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';

import { CallPage } from './call';

@NgModule({
  declarations: [
    CallPage
  ],
  imports: [
    IonicPageModule.forChild(CallPage),
    TranslateModule.forChild(),
    SharedModule
  ],
  exports: [
    CallPage
  ]
})
export class CallPageModule {}
