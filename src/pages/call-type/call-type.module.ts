import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';

import { CallTypePage } from './call-type';

@NgModule({
  declarations: [
    CallTypePage
  ],
  imports: [
    IonicPageModule.forChild(CallTypePage),
    TranslateModule.forChild(),
    SharedModule
  ],
  exports: [
    CallTypePage
  ]
})
export class CallTypePageModule {
}
